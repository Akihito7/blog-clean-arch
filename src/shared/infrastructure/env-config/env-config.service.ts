import { Injectable } from "@nestjs/common";
import { EnvConfigInterface } from "./env-config.interface";
import { ConfigService } from "@nestjs/config";
import { envSchemaType } from "./env";

@Injectable()
export class EnvConfigService implements EnvConfigInterface {

  constructor(private readonly configService: ConfigService<envSchemaType>) { }

  getPort(): Number {
    return Number(this.configService.get<Number>('PORT'))
  }
}