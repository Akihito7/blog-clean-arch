import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { AuthModule } from './shared/infrastructure/authentication/auth.module';
import { UserModule } from './modules/users/infrastructure/user.module';
import { PostController } from './modules/posts/infrastructure/post.controller';


@Module({
  imports: [EnvConfigModule, AuthModule, UserModule, PostController]
})
export class AppModule { }
