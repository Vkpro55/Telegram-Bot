import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { BotSettingsService } from './bot-settings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
export class BotSettingsController {
  constructor(private readonly botSettingsService: BotSettingsService) { }

  @Get()
  getBotSettings() {
    return this.botSettingsService.getBotSettings();
  }

  @Patch()
  // @UseGuards(AuthGuard('google')) // Only allow admin to update bot settings
  updateBotSettings(@Body() settings: any) {
    return this.botSettingsService.updateBotSettings(settings);
  }
}
