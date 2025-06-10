import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { AuthModule } from './shared/infrastructure/authentication/auth.module';
import { UserModule } from './modules/users/infrastructure/user.module';
import { PostModule } from './modules/posts/infrastructure/post.module';
import { CommentModule } from './modules/comments/infrastructure/comment.module';
import { LikeModule } from './modules/likes/infrastructure/like.module';
import { TipModule } from './modules/tips/infrastructure/tip.module';


@Module({
  imports: [EnvConfigModule, AuthModule, UserModule, PostModule, CommentModule, LikeModule, TipModule]
})
export class AppModule { }
