import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { EnvConfigService } from '../env-config/env-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  async generateToken(userId: string) {
    const acessToken = this.jwtService.sign({ sub: userId });
    return { acessToken }
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token)
  }
}