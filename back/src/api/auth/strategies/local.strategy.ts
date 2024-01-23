import { AuthService } from './../auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/api/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<boolean | Partial<User>> {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new BadRequestException('Email or password incorrect');
    }

    return user;
  }
}
