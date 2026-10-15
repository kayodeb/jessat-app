import { Controller, Get, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserRole, UserStatus } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Request() req, @Body() body: { name?: string; email?: string; phone?: string; avatar?: string }) {
    return this.usersService.updateProfile(req.user.userId, body);
  }

  @Patch('profile/password')
  changePassword(@Request() req, @Body() body: { newPassword: string }) {
    return this.usersService.changePassword(req.user.userId, body.newPassword);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Get()
  findAll(@Query() query: { page?: number; limit?: number }) {
    return this.usersService.findAll(query);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() body: { role: UserRole }) {
    return this.usersService.updateRole(id, body.role);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: UserStatus }) {
    return this.usersService.updateStatus(id, body.status);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
