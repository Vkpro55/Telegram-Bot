import { Module } from '@nestjs/common';
import { AdminController } from '../admin.controller'; // Adjust path as necessary
import { BotSettingsModule } from './bot-settings/bot-settings.module'; // Assuming BotSettingsService is in BotSettingsModule
import { UserManagementModule } from './user-management/user-management.module'; // Assuming UserService is in UserManagementModule

@Module({
  imports: [
    BotSettingsModule,         // Import BotSettingsModule to use BotSettingsService
    UserManagementModule,      // Import UserManagementModule to use UserService
  ],
  controllers: [AdminController],
  providers: [], // Add any providers if needed, in your case it's handled by the imported modules
})
export class AppModule { }
