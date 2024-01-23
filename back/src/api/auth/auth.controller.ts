import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decoratos/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
@UseGuards(AuthGuard('local'))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@GetUser() user: User): Promise<IToken> {
    return this.authService.login(user);
  }
}
