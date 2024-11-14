import { Controller, Get, Param, Put } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) { }

  //  curl -X GET http://localhost:8000/bot/ -H "Content-Type: application/json"
  @Get('/')
  async getToken() {
    const result = await this.botService.getToken();
    return result;
  }

  // curl -X PUT http://localhost:8000/bot/7558680633:AAFT0U70W8XZyRBMQmCtafYz50lq_7Y54oo -H "Content-Type: application/json"
  @Put('/:token')
  async updateToken(@Param('token') token: string) {
    const result = await this.botService.updateToken(token);
    return result;
  }
}
