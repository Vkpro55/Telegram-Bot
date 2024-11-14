import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vinodrao835:OtIbudViTEbhZTfk@cluster0.2fobn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UserModule,
    BotModule,
  ],
  // imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
