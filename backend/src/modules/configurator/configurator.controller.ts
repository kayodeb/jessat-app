import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConfiguratorService } from './configurator.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Configurator')
@Controller('configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Get('options')
  findAll() {
    return this.configuratorService.findAll();
  }

  @Get('options/:category')
  findByCategory(@Param('category') category: string) {
    return this.configuratorService.findByCategory(category);
  }

  @Post('validate')
  validate(@Body() body: { selectedOptions: Record<string, string> }) {
    return this.configuratorService.validate(body.selectedOptions);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('options')
  create(@Body() body: any) {
    return this.configuratorService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Patch('options/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.configuratorService.update(id, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete('options/:id')
  remove(@Param('id') id: string) {
    return this.configuratorService.remove(id);
  }
}
