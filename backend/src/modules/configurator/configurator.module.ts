import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigOption } from './config-option.entity';
import { ConfiguratorController } from './configurator.controller';
import { ConfiguratorService } from './configurator.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigOption])],
  controllers: [ConfiguratorController],
  providers: [ConfiguratorService],
})
export class ConfiguratorModule {}
