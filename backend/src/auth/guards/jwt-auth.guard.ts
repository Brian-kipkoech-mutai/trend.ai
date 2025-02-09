import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.signedCookies['accessToken'];
    if (!accessToken) {
      return false;
    }

    try {
      const user = this.jwtService.verify(accessToken);
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
