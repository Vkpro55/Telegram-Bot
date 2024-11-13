"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bot_settings_service_1 = require("./bot-settings.service");
const bot_settings_controller_1 = require("./bot-settings.controller");
let BotSettingsModule = class BotSettingsModule {
};
BotSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [bot_settings_service_1.BotSettingsService],
        controllers: [bot_settings_controller_1.BotSettingsController],
    })
], BotSettingsModule);
exports.BotSettingsModule = BotSettingsModule;
//# sourceMappingURL=bot-settings.module.js.map