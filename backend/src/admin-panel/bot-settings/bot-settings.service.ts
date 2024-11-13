import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotSettingsService {
  private botSettings: { apiKey: string };

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    console.log('Loaded API Key:', apiKey);  // Add this line
    this.botSettings = {
      apiKey,
    };
  }

  getBotSettings() {
    return this.botSettings;
  }

  updateBotSettings(settings: any) {
    this.botSettings = { ...this.botSettings, ...settings };
    return { message: 'Bot settings updated successfully' };
  }
}
