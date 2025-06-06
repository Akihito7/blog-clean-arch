import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AddComment } from "../application/use-cases/add-comment.use-case";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { GetCommentByPost } from "../application/use-cases/get-comment-by-post.use-case";
import { GetCommentAuthorInPost } from "../application/use-cases/get-comment-author-in-post.use-case";
import { GetCommentByAuthor } from "../application/use-cases/get-comment-by-author.use-case";
import { GetCommentByContent } from "../application/use-cases/get-comment-by-content.use-case";
import { ParamsGetCommentAuthorInPostDTO } from "./dto/get-comment-author-in-post.dto";
import { QueryCommentByContentDTO } from "./dto/get-comment-by-content.dto";

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {

  @Inject(AddComment.UseCase)
  private readonly addCommentUseCase: AddComment.UseCase;

  @Inject(GetCommentAuthorInPost.UseCase)
  private readonly getCommentAuthorInPostUseCase: GetCommentAuthorInPost.UseCase;

  @Inject(GetCommentByAuthor.UseCase)
  private readonly getCommentByAuthorUseCase: GetCommentByAuthor.UseCase;

  @Inject(GetCommentByContent.UseCase)
  private readonly getCommentByContentUseCase: GetCommentByContent.UseCase;

  @Inject(GetCommentByPost.UseCase)
  private readonly getCommentByPostUseCase: GetCommentByPost.UseCase;

  @Post('create')
  async createComment(@Req() req, @Body() body: any) {
    const userId = req.user.id;
    return this.addCommentUseCase.execute({
      ...body,
      authorId: userId,
    })
  }

  @Get(':postId/:authorId')
  async getCommentByAuthorInPost(@Param('') params: ParamsGetCommentAuthorInPostDTO) {
    const { postId, authorId } = params
    return this.getCommentAuthorInPostUseCase.execute({ postId, authorId })
  }

  @Get(':authorId')
  async getCommentByAuthor(@Param('authorId') authorId: string) {
    return this.getCommentByAuthorUseCase.execute({ authorId })
  }

  @Get('by-content')
  async getCommentByContent(@Query() query: QueryCommentByContentDTO) {
    const { content } = query;
    return this.getCommentByContentUseCase.execute({ content })
  }

  @Get(':postId')
  async getByPostId(@Param('postId') postId: string) {
    return this.getCommentByPostUseCase.execute({ postId })
  }
}