import {
  Controller, Post, Get, Body, Param, Req, Headers, RawBodyRequest, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('intent')
  createIntent(@Body() body: { orderId: string }, @Req() req) {
    return this.paymentsService.createIntent(body.orderId, req.user.userId);
  }

  // Stripe webhook — no JWT guard, uses raw body + signature
  @Post('webhook')
  handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentsService.handleWebhook(req.rawBody, signature);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  getByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.getByOrder(orderId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post(':orderId/refund')
  refund(@Param('orderId') orderId: string) {
    return this.paymentsService.refund(orderId);
  }
}
