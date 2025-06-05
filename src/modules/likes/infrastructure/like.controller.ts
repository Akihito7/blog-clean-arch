import { Body, Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AddLike } from "../application/use-cases/add-like.use-case";
import { AddLikeDTO } from "./dto/add-like.dto";
import { AuthGuard } from "src/shared/guards/auth.guard";


@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {

  @Inject(AddLike.UseCase)
  private addLikeUseCase: AddLike.UseCase;

  @Post('create')
  async create(@Req() req, @Body() body: AddLikeDTO) {
    const userId = req.user.id;
    return this.addLikeUseCase.execute({
      ...body,
      authorId: userId
    })
  }
}