import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule
import { BotSettingsService } from './bot-settings.service';
import { BotSettingsController } from './bot-settings.controller';

@Module({
  imports: [ConfigModule],  // Add ConfigModule to imports
  providers: [BotSettingsService],
  controllers: [BotSettingsController],
})
export class BotSettingsModule { }
