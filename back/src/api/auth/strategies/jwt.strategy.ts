import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/api/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_TOKEN'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: ITokenPayload): Promise<User> {
    const { id } = payload;
    const user: User = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
