import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AddLike } from "../application/use-cases/add-like.use-case";
import { AddLikeDTO } from "./dto/add-like.dto";
import { CheckLike } from "../application/use-cases/check-like.use-case";
import { ListLike } from "../application/use-cases/list-like.use-case";
import { RemoveLike } from "../application/use-cases/remove-like.use-case";
import { CheckLikeDTO } from "./dto/check-like.dto";
import { GetLikeByPostAndAuthor } from "../application/use-cases/get-like-by-post-and-author";
import { AuthGuard } from "src/shared/infrastructure/guards/auth.guard";
import { GetLikeByCommentAndAuthor } from "../application/use-cases/get-like-by-comment-and-author";
import { AddLikeToCommentUseCase } from "../application/use-cases/add-like-to-comment.use-case";
import { CheckCommentLike } from "../application/use-cases/check-like-comment";
import { CheckLikeCommentDTO } from "./dto/check-like-comment.dto";


@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {

  @Inject(AddLike.UseCase)
  private addLikeUseCase: AddLike.UseCase;

  @Inject(CheckLike.UseCase)
  private checkLikeUseCase: CheckLike.UseCase;

  @Inject(ListLike.UseCase)
  private listLikeUseCase: ListLike.UseCase;

  @Inject(RemoveLike.UseCase)
  private removeLikeUseCase: RemoveLike.UseCase;

  @Inject(AddLikeToCommentUseCase.UseCase)
  private addLikeToCommentUseCaseUseCase: AddLikeToCommentUseCase.UseCase;

  @Inject(GetLikeByPostAndAuthor.UseCase)
  private GetLikeByPostAndAuthorUseCase: GetLikeByPostAndAuthor.UseCase;


  @Inject(GetLikeByCommentAndAuthor.UseCase)
  private getLikeByCommentAndAuthorUseCase: GetLikeByCommentAndAuthor.UseCase;

  @Inject(CheckCommentLike.UseCase)
  private CheckCommentLikeUseCase: GetLikeByCommentAndAuthor.UseCase;


  @Post('create')
  async create(@Req() req, @Body() body: AddLikeDTO) {
    const userId = req.user.id;
    return this.addLikeUseCase.execute({
      ...body,
      authorId: userId
    })
  }

  @Get('check-like/:postId/:authorId')
  async checkLike(@Param() params: CheckLikeDTO) {
    const { postId, authorId } = params;
    return this.checkLikeUseCase.execute({ postId, authorId })
  }

  @Get(':postId/:authorId')
  async getLikeByPostAndAuthor(@Param() param) {
    const { postId, authorId } = param;
    return this.GetLikeByPostAndAuthorUseCase.execute({ postId, authorId })
  }


  @Get('list/:postId')
  async listLike(@Param("postId") postId: string) {
    return this.listLikeUseCase.execute({ postId })
  }

  @Delete('delete/:likeId')
  async remove(@Req() req, @Param("likeId") likeId: string) {
    const userId = req.user.id;
    return this.removeLikeUseCase.execute({ id: likeId, requesterId: userId })
  }

  @Post("comment/create")
  async likeComment(@Req() req, @Body() body: any) {
    const userId = req.user.id;
    console.log("its me comment id", body.commentId)
    return this.addLikeToCommentUseCaseUseCase.execute({
      commentId: body.commentId,
      authorId: userId,
    });
  }

  @Get("comment/:commentId/:authorId")
  async getLikeByCommentAndAuthor(
    @Param("commentId") commentId: string,
    @Param("authorId") authorId: string
  ) {
    return this.getLikeByCommentAndAuthorUseCase.execute({
      commentId,
      authorId,
    });
  }

  @Get('check-like-comment/:commentId/:authorId')
  async checkLikeComment(@Param() params: CheckLikeCommentDTO) {
    const { commentId, authorId } = params;
    return this.CheckCommentLikeUseCase.execute({ commentId, authorId })
  }

}