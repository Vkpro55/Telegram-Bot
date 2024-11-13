import { Controller, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user-management.service';

@Controller('users')
export class UserManagementController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
