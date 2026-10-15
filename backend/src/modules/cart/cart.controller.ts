import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('items')
  addItem(@Request() req, @Body() body: { productId: string; quantity: number; selectedOptions?: Record<string, string>; customConfigurationId?: string }) {
    return this.cartService.addItem(req.user.userId, body);
  }

  @Patch('items/:itemId')
  updateItem(@Request() req, @Param('itemId') itemId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(req.user.userId, itemId, body.quantity);
  }

  @Delete('items/:itemId')
  removeItem(@Request() req, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(req.user.userId, itemId);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }

  @Post('apply-promo')
  applyPromo(@Request() req, @Body() body: { code: string }) {
    return this.cartService.applyPromo(req.user.userId, body.code);
  }
}
