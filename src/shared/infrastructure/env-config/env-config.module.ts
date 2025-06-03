import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvConfigService } from "./env-config.service";
import { envConfiguration } from "./env";
import { join } from "node:path";

console.log(process.env.NODE_ENV)
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [join(process.cwd(), `.env.${process.env.NODE_ENV}`)],
    isGlobal: true,
    load: [envConfiguration]
  })],
  providers: [EnvConfigService],
  exports: [EnvConfigService]
})
export class EnvConfigModule { }