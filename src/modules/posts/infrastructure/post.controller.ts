import { Body, Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { CreatePostDTO } from "./dto/create-post.dto";
import { CreatePost } from "../application/use-cases/create-post.use-case";


@UseGuards(AuthGuard)
@Controller("post")
export class PostController {

  @Inject(CreatePost.UseCase)
  private readonly createPostUseCase: CreatePost.UseCase

  @Post('create')
  async createPost(@Req() req, @Body() body: CreatePostDTO) {
    return this.createPostUseCase.execute({
      authorId: req.user.id,
      ...body
    })
  }
}