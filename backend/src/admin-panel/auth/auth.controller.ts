import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // Redirects the user to Google login
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req, @Res() res) {
        // Handles the Google OAuth response and redirects the user
        const user = req.user;
        return res.json({ token: user.accessToken });
        // res.redirect(`http://localhost:3000/dashboard?token=${user.accessToken}`); // Redirect to your app with the token
    }
}
