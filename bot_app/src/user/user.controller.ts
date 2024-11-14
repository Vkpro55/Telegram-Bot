import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //  curl -X GET http://localhost:8000/user/ -H "Content-Type: application/json"
  @Get('/')
  async getAllUsers() {
    const result = await this.userService.getAllUsers();
    return result;
  }

  // curl -X POST http://localhost:8000/user/ -H "Content-Type: application/json" -d '{"firstName": "John", "chatId": 12345, "status": "Active"}'
  @Post('/')
  async addUser(@Body() userDTO: UserDTO) {
    const result = await this.userService.addUser(userDTO);
    return result;
  }

  // curl -X DELETE http://localhost:8000/user/12345 -H "Content-Type: application/json"
  @Delete('/:chatId')
  async removeUser(@Param('chatId') chatId: number) {
    const result = await this.userService.removeUser(chatId);
    return result;
  }

  // curl -X PUT http://localhost:8000/user/12345 -H "Content-Type: application/json" -d '{"status": "Inactive"}'
  @Put('/:chatId')
  async changeStatus(
    @Param('chatId') chatId: number,
    @Body() body: { status: string },
  ) {
    const { status } = body;
    const result = await this.userService.changeStatus(chatId, status);
    return result;
  }
}
