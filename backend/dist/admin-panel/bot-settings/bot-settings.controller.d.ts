import { BotSettingsService } from './bot-settings.service';
export declare class BotSettingsController {
    private readonly botSettingsService;
    constructor(botSettingsService: BotSettingsService);
    getBotSettings(): {
        apiKey: string;
    };
    updateBotSettings(settings: any): {
        message: string;
    };
}
