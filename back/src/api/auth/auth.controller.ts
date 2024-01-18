import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser } from './dto/login-user.dto';
import { IToken } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() loginUserDto: LoginUser): Promise<IToken> {
    return this.authService.login(loginUserDto);
  }
}
