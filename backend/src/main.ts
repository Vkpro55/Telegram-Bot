

// import { NestFactory } from '@nestjs/core';
// import { TelegramModule } from './telegram.module'; // Import the TelegramModule
// import { TelegramBot } from './telegram.bot';

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(TelegramModule); // Pass TelegramModule to createApplicationContext
//   const telegramBot = app.get(TelegramBot); // Get the TelegramBot provider from the app context
//   telegramBot.startPolling(); // Start the bot's polling
// }

// bootstrap();









import { NestFactory } from '@nestjs/core';
import { AppModule } from './admin-panel/app.module';
import { TelegramModule } from './telegram.module'; // Import the Telegram module
import { TelegramBot } from './telegram.bot'; // Import the TelegramBot service

async function bootstrap() {
  // Start the NestJS HTTP server
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Create application context for the Telegram bot
  const telegramApp = await NestFactory.createApplicationContext(TelegramModule);
  const telegramBot = telegramApp.get(TelegramBot); // Get the Telegram bot instance
  telegramBot.startPolling(); // Start polling for messages

  console.log('Bot started polling...');
}

bootstrap();




