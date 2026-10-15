import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('stats/revenue')
  getRevenue(@Query('period') period: 'day' | 'week' | 'month') {
    return this.adminService.getRevenueByPeriod(period);
  }

  @Get('stats/top-products')
  getTopProducts(@Query('limit') limit: number) {
    return this.adminService.getTopProducts(limit);
  }

  @Get('stats/orders-by-status')
  getOrdersByStatus() {
    return this.adminService.getOrdersByStatus();
  }
}
