"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./admin-panel/app.module");
const telegram_module_1 = require("./telegram.module");
const telegram_bot_1 = require("./telegram.bot");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    const telegramApp = await core_1.NestFactory.createApplicationContext(telegram_module_1.TelegramModule);
    const telegramBot = telegramApp.get(telegram_bot_1.TelegramBot);
    telegramBot.startPolling();
    console.log('Bot started polling...');
}
bootstrap();
//# sourceMappingURL=main.js.map