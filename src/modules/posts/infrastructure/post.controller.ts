import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { CreatePostDTO } from "./dto/create-post.dto";
import { CreatePost } from "../application/use-cases/create-post.use-case";
import { GetPost } from "../application/use-cases/get-post-by-id.use-case";


@UseGuards(AuthGuard)
@Controller("post")
export class PostController {

  @Inject(CreatePost.UseCase)
  private readonly createPostUseCase: CreatePost.UseCase

  @Inject(GetPost.UseCase)
  private readonly getPostUseCase: GetPost.UseCase;


  @Post('create')
  async createPost(@Req() req, @Body() body: CreatePostDTO) {
    return this.createPostUseCase.execute({
      authorId: req.user.id,
      ...body
    })
  }

  @Get(':id')
  async getPost(@Param("id") id: string) {
    return this.getPostUseCase.execute({ id })
  };

}