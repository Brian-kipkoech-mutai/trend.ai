import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          let token = null;
          if (request && request.cookies) {
            token = token = request.signedCookies
              ? request.signedCookies['accessToken']
              : null;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('appConfig.jwtSecret') ||
        process.env.JWT_SECRET ||
        '',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
      email: payload.email,
    };
  }
}
