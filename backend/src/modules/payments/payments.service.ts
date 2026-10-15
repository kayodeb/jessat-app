import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Payment, PaymentStatus } from './payment.entity';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/order.entity';
import { UserRole } from '../users/user.entity';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(
    @InjectRepository(Payment) private readonly repo: Repository<Payment>,
    private readonly ordersService: OrdersService,
    private readonly config: ConfigService,
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-08-16',
    });
  }

  async createIntent(orderId: string, userId: string) {
    const order = await this.ordersService.findOne(orderId, userId, UserRole.USER);

    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe works in centimes
      currency: 'eur',
      metadata: { orderId, userId },
    });

    const payment = this.repo.create({
      orderId,
      stripePaymentIntentId: intent.id,
      stripeClientSecret: intent.client_secret,
      amount: order.total,
      status: PaymentStatus.PENDING,
    });
    await this.repo.save(payment);

    return { clientSecret: intent.client_secret, paymentId: payment.id };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const secret = this.config.get('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch {
      throw new BadRequestException('Webhook signature invalide');
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      await this.repo.update(
        { stripePaymentIntentId: intent.id },
        { status: PaymentStatus.SUCCEEDED },
      );
      const payment = await this.repo.findOne({ where: { stripePaymentIntentId: intent.id } });
      if (payment) {
        await this.ordersService.updateStatus(payment.orderId, OrderStatus.CONFIRMED);
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object as Stripe.PaymentIntent;
      await this.repo.update(
        { stripePaymentIntentId: intent.id },
        { status: PaymentStatus.FAILED },
      );
    }

    return { received: true };
  }

  async getByOrder(orderId: string) {
    return this.repo.find({ where: { orderId }, order: { createdAt: 'DESC' } });
  }

  async refund(orderId: string) {
    const payment = await this.repo.findOne({
      where: { orderId, status: PaymentStatus.SUCCEEDED },
    });
    if (!payment) throw new NotFoundException('Paiement introuvable ou non effectué');

    await this.stripe.refunds.create({ payment_intent: payment.stripePaymentIntentId });
    await this.repo.update(payment.id, { status: PaymentStatus.REFUNDED });
    await this.ordersService.updateStatus(orderId, OrderStatus.REFUNDED);

    return { message: 'Remboursement effectué' };
  }
}
