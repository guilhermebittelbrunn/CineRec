import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUser } from './dto/login-user.dto';
import { IToken } from './interfaces/token.interface';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUser): Promise<IToken> {
    const { email, password } = loginUserDto;
    const user: User = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(user.password, password))) {
      const payload: ITokenPayload = { id: user.id };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    }

    throw new BadRequestException('Email or password incorrect');
  }
}
