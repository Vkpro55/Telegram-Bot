"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotSettingsController = void 0;
const common_1 = require("@nestjs/common");
const bot_settings_service_1 = require("./bot-settings.service");
let BotSettingsController = class BotSettingsController {
    constructor(botSettingsService) {
        this.botSettingsService = botSettingsService;
    }
    getBotSettings() {
        return this.botSettingsService.getBotSettings();
    }
    updateBotSettings(settings) {
        return this.botSettingsService.updateBotSettings(settings);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BotSettingsController.prototype, "getBotSettings", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotSettingsController.prototype, "updateBotSettings", null);
BotSettingsController = __decorate([
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [bot_settings_service_1.BotSettingsService])
], BotSettingsController);
exports.BotSettingsController = BotSettingsController;
//# sourceMappingURL=bot-settings.controller.js.map