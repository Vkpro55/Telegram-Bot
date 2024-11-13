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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const bot_settings_service_1 = require("./admin-panel/bot-settings/bot-settings.service");
const user_management_service_1 = require("./admin-panel/user-management/user-management.service");
const swagger_1 = require("@nestjs/swagger");
let AdminController = class AdminController {
    constructor(botSettingsService, userService) {
        this.botSettingsService = botSettingsService;
        this.userService = userService;
    }
    async getSettings() {
        try {
            const settings = await this.botSettingsService.getBotSettings();
            return { statusCode: common_1.HttpStatus.OK, message: 'Bot settings fetched successfully', data: settings };
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch bot settings', error: error.message };
        }
    }
    async updateSettings(settings) {
        try {
            const updatedSettings = await this.botSettingsService.updateBotSettings(settings);
            return { statusCode: common_1.HttpStatus.OK, message: 'Bot settings updated successfully', data: updatedSettings };
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to update bot settings', error: error.message };
        }
    }
    async getUsers() {
        try {
            const users = await this.userService.getAllUsers();
            return { statusCode: common_1.HttpStatus.OK, message: 'User accounts fetched successfully', data: users };
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch users', error: error.message };
        }
    }
    async blockUser(id) {
        try {
            const result = await this.userService.blockUser(id);
            if (result) {
                return { statusCode: common_1.HttpStatus.OK, message: `User with ID ${id} blocked successfully` };
            }
            else {
                return { statusCode: common_1.HttpStatus.NOT_FOUND, message: `User with ID ${id} not found` };
            }
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to block user', error: error.message };
        }
    }
    async deleteUser(id) {
        try {
            const result = await this.userService.deleteUser(id);
            if (result) {
                return { statusCode: common_1.HttpStatus.OK, message: `User with ID ${id} deleted successfully` };
            }
            else {
                return { statusCode: common_1.HttpStatus.NOT_FOUND, message: `User with ID ${id} not found` };
            }
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to delete user', error: error.message };
        }
    }
};
__decorate([
    (0, common_1.Get)('settings'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bot settings fetched successfully.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)('settings'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bot settings updated successfully.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Fetched all user accounts.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('users/:id/block'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User blocked successfully.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Post)('users/:id/delete'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('Admin'),
    __metadata("design:paramtypes", [bot_settings_service_1.BotSettingsService,
        user_management_service_1.UserService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map