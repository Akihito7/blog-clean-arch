import { Controller, Post } from "@nestjs/common";

@Controller('comment')
export class CommentController {

  @Post('create')
  async createComment() {

  }
}