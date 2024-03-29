import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../common/decoratos/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@UseGuards(AuthGuard('local'))
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true });

  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      default: {
        email: 'henrique@admin.com.br',
        password: '!Henrique123',
      },
    },
  })
  @Post()
  login(@GetUser() user: User): Promise<IToken> {
    this.logger.log(
      `user "${user.name}" is logged with the following email: "${user.email}"`,
    );
    return this.authService.login(user);
  }
}
