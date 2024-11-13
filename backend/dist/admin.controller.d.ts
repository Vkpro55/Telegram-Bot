import { HttpStatus } from '@nestjs/common';
import { BotSettingsService } from './admin-panel/bot-settings/bot-settings.service';
import { UserService } from './admin-panel/user-management/user-management.service';
export declare class AdminController {
    private readonly botSettingsService;
    private readonly userService;
    constructor(botSettingsService: BotSettingsService, userService: UserService);
    getSettings(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            apiKey: string;
        };
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateSettings(settings: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            message: string;
        };
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getUsers(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: string;
            email: string;
            role: string;
            status: string;
        }[];
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
    blockUser(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
    }>;
    deleteUser(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
    }>;
}
