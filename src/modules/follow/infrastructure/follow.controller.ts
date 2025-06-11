import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { Follow } from "../application/use-cases/follow.use-case";
import { FollowDTO } from "./dtos/follow.dto";
import { Unfollow } from "../application/use-cases/unfollow.use-case";
import { FindFollowers } from "../application/use-cases/find-followers.use-case";
import { FindFollowing } from "../application/use-cases/find-followings.use-case";
import { AuthGuard } from "src/shared/infrastructure/guards/auth.guard";


@UseGuards(AuthGuard)
@Controller('follow')
export class FollowController {

  @Inject(Follow.UseCase)
  private readonly followUseCase: Follow.UseCase;

  @Inject(Unfollow.UseCase)
  private readonly unfollowUseCase: Unfollow.UseCase;

  @Inject(FindFollowers.UseCase)
  private readonly findFollowers: FindFollowers.UseCase;

  @Inject(FindFollowing.UseCase)
  private readonly findFollowing: FindFollowing.UseCase;


  @Get('get-followers/:userId')
  async getFolllowers(@Param('userId') userId: string) {
    return this.findFollowers.execute({ userId })
  }

  @Get('get-following/:userId')
  async getFollowing(@Param('userId') userId: string) {
    return this.findFollowing.execute({ userId })
  }

  @Post()
  async follow(@Body() body: FollowDTO) {
    const { followerId, followingId } = body
    await this.followUseCase.execute({ followerId, followingId })
  }

  @Delete()
  async unfollow(@Body() body: FollowDTO) {
    const { followerId, followingId } = body
    await this.unfollowUseCase.execute({ requesteredId: followerId, followedId: followingId })
  }
}