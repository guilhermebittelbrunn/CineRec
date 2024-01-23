import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUser } from './dto/login-user.dto';
import { IToken } from './interfaces/token.interface';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User): Promise<IToken> {
    const payload: ITokenPayload = { id: user.id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_TOKEN'),
    });
    return { access_token: token };
  }

  async validateUser(
    loginUserDto: LoginUser,
  ): Promise<boolean | Partial<User>> {
    try {
      const { password, ...user } = await this.userService.findByEmail(
        loginUserDto.email,
      );

      if (user && (await bcrypt.compare(loginUserDto.password, password))) {
        return user;
      }
    } catch (error) {
      return null;
    }
  }
}
