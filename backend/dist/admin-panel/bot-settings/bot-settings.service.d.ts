import { ConfigService } from '@nestjs/config';
export declare class BotSettingsService {
    private configService;
    private botSettings;
    constructor(configService: ConfigService);
    getBotSettings(): {
        apiKey: string;
    };
    updateBotSettings(settings: any): {
        message: string;
    };
}
