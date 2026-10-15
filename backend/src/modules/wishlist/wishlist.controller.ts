import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Wishlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  findAll(@Request() req) {
    return this.wishlistService.findByUser(req.user.userId);
  }

  @Post(':productId')
  add(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.add(req.user.userId, productId);
  }

  @Delete(':productId')
  remove(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.remove(req.user.userId, productId);
  }
}
