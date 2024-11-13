import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleOAuthStrategy } from './google.strategy';  // Updated import
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        PassportModule,
        ConfigModule.forRoot(), // Ensure the config module is initialized
    ],
    providers: [GoogleOAuthStrategy],  // Use your renamed strategy here
    controllers: [AuthController],
})
export class AuthModule { }
