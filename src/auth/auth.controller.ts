import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login/:username/:password')
    signIn(
        @Param('username') username: string,
        @Param('password') password: string
    ): AuthResponseDto {
        return this.authService.signIn(username, password);
    }
}
