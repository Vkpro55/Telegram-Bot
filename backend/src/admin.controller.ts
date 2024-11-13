import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './admin-panel/user-management/user-management.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService // make sure UserService is injected here, not BotSettingsService
  ) { }

  @Get('settings')
  getSettings(): string {
    return 'Bot settings';
  }

  @Post('settings')
  updateSettings(): string {
    return 'Bot settings updated';
  }

  @Get('users')
  getUsers(): string {
    return 'User accounts';
  }

}
