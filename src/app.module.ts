import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { AuthModule } from './shared/infrastructure/authentication/auth.module';
import { UserModule } from './modules/users/infrastructure/user.module';


@Module({
  imports: [EnvConfigModule, AuthModule, UserModule]
})
export class AppModule { }
