import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { Follow } from "../application/use-cases/follow.use-case";
import { FollowDTO } from "./dtos/follow.dto";
import { AuthGuard } from "src/shared/infrastructure/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('follow')
export class FollowController {

  @Inject(Follow.UseCase)
  private readonly followUseCase: Follow.UseCase;

  @Post()
  async follow(@Body() body: FollowDTO) {
    const { followerId, followingId } = body
    await this.followUseCase.execute({ followerId, followingId })
  }
}