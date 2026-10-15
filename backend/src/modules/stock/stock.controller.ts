import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { StockMovementType } from './stock-movement.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Stock')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('movements')
  findAll(@Query() query: { page?: number; limit?: number; productId?: string }) {
    return this.stockService.findAll(query);
  }

  @Post('movements')
  create(@Body() body: { productId: string; changeQuantity: number; type: StockMovementType; reason?: string }) {
    return this.stockService.recordMovement(body);
  }
}
