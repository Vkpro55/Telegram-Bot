import { Module } from '@nestjs/common';
import { TelegramBot } from './telegram.bot';

@Module({
    providers: [TelegramBot],
})
export class TelegramModule { }
