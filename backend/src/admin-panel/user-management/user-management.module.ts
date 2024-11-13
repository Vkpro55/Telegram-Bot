import { Module } from '@nestjs/common';
import { UserManagementController } from './user-management.controller';
import { UserService } from './user-management.service';

@Module({
  controllers: [UserManagementController],
  providers: [UserService],
})
export class UserManagementModule { }
