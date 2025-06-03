import { Injectable } from "@nestjs/common";
import { EnvConfigInterface } from "./env-config.interface";
import { ConfigService } from "@nestjs/config";
import { envSchemaType } from "./env";

@Injectable()
export class EnvConfigService implements EnvConfigInterface {

  constructor(private readonly configService: ConfigService<envSchemaType>) { }

  getPort(): number {
    return this.configService.get<number>('PORT')!
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')!
  }

  getJwtExpiresIn(): number {
    return (this.configService.get<number>('JWT_EXPIRES_IN'))!
  }
}