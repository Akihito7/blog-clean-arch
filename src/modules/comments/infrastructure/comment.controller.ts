import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AddComment } from "../application/use-cases/add-comment.use-case";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { GetCommentByPost } from "../application/use-cases/get-comment-by-post.use-case";

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {

  @Inject(AddComment.UseCase)
  private readonly addCommentUseCase: AddComment.UseCase;

  @Inject(GetCommentByPost.UseCase)
  private readonly getCommentByPost: GetCommentByPost.UseCase;

  @Post('create')
  async createComment(@Req() req, @Body() body: any) {
    const userId = req.user.id;
    return this.addCommentUseCase.execute({
      ...body,
      authorId: userId,
    })
  }

  @Get(':postId')
  async getByPostId(@Param('postId') postId: string) {
    return this.getCommentByPost.execute({ postId })
  }
}