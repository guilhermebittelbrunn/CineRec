import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('local'))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Req() req: any): Promise<IToken> {
    return this.authService.login(req.user);
  }
}
