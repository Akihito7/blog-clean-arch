import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { CreatePostDTO } from "./dto/create-post.dto";
import { CreatePost } from "../application/use-cases/create-post.use-case";
import { GetPost } from "../application/use-cases/get-post-by-id.use-case";
import { DeletePost } from "../application/use-cases/delete-post.use-case";
import { GetManyPostByAuthorId } from "../application/use-cases/get-many-post-by-author-id.use-case";
import { GetManyPost } from "../application/use-cases/get-many-post.use-case";
import { QueryGetPostByTags } from "./dto/get-post-by-tags.dto";
import { GetPostByTags } from "../application/use-cases/get-post-by-tags.use-case";
import { UpdatePost } from "../application/use-cases/update-post.use-case";
import { UpdatePostDTO } from "./dto/update-post.dto";


@UseGuards(AuthGuard)
@Controller("post")
export class PostController {

  @Inject(CreatePost.UseCase)
  private readonly createPostUseCase: CreatePost.UseCase

  @Inject(GetPost.UseCase)
  private readonly getPostUseCase: GetPost.UseCase;

  @Inject(DeletePost.UseCase)
  private readonly deletePostUseCase: DeletePost.UseCase;

  @Inject(GetManyPostByAuthorId.UseCase)
  private readonly getManyPostByAuthorIdUseCase: GetManyPostByAuthorId.UseCase;

  @Inject(GetManyPost.UseCase)
  private readonly getManyPostUseCase: GetManyPost.UseCase;

  @Inject(GetPostByTags.UseCase)
  private readonly getPostByTagsUseCase: GetPostByTags.UseCase;

  @Inject(UpdatePost.UseCase)
  private readonly updatePostUseCase: UpdatePost.UseCase;
  

  @Get(':id')
  async getPost(@Param("id") id: string) {
    return this.getPostUseCase.execute({ id })
  };

  @Get('many')
  async getManyPost() {
    return this.getManyPostUseCase.execute()
  }

  @Get('by-tags')
  async getPostByTags(@Query() query: QueryGetPostByTags) {
    const tags = query.tags.split(',');
    return this.getPostByTagsUseCase.execute({ tags })
  }

  @Get("author/:id")
  async getManyByAuthorId(@Param("id") id: string) {
    return this.getManyPostByAuthorIdUseCase.execute({ authorId: id })
  }

  @Post('create')
  async createPost(@Req() req, @Body() body: CreatePostDTO) {
    return this.createPostUseCase.execute({
      authorId: req.user.id,
      ...body
    })
  }

  @Put(":id")
  async updatePost(@Req() req, @Body() body: UpdatePostDTO) {
    const userId = req.user.id;
    return this.updatePostUseCase.execute({
      requesterId: userId,
      ...body
    })
  }

  @Delete("delete/:id")
  async deletePost(@Req() req, @Param("id") id: string) {
    const userId = req.user.id;
    return this.deletePostUseCase.execute({ id, requesterId: userId })
  }

}