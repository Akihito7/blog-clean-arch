import { Body, Controller, Delete, Inject, Patch, Post, Put, Req } from "@nestjs/common";
import { CreateAccountUser } from "../application/use-cases/create-account-user.use-case";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Login } from "../application/use-cases/login.use-case";
import { AuthService } from "src/shared/infrastructure/authentication/auth.service";
import { LoginDTO } from "./dto/login-dto";
import { UpdateUser } from "../application/use-cases/update-user.use-case";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdateUserPassword } from "../application/use-cases/update-user-password.use-case";
import { UpdateUserPasswordDTO } from "./dto/update-user-password.dto";

@Controller('user')
export class UserController {

  constructor(private readonly authService: AuthService) { }

  @Inject(CreateAccountUser.UseCase)
  private createAccountUseCase: CreateAccountUser.UseCase

  @Inject(Login.UseCase)
  private loginUseCase: Login.UseCase

  @Inject(UpdateUser.UseCase)
  private updateUserUseCase: UpdateUser.UseCase

  @Inject(UpdateUserPassword.UseCase)
  private updateUserPasswordUseCase: UpdateUserPassword.UseCase


  @Post('create')
  async createAccount(@Body() body: CreateUserDTO) {
    return this.createAccountUseCase.execute(body)
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const result = await this.loginUseCase.execute(body);
    return this.authService.generateToken(result.id)
  }

  @Put()
  async update(@Req() req, @Body() body: UpdateUserDTO) {
    const userId = req.user.id;
    return this.updateUserUseCase.execute({
      id: userId,
      ...body
    });
  }


  @Patch('update-password')
  async updatePassword(@Req() req, @Body() body: UpdateUserPasswordDTO) {
    const userId = req.user.id;
    return this.updateUserPasswordUseCase.execute({
      id: userId,
      ...body
    });
  }

  @Delete()
  async delete(@Body() body: LoginDTO) {
    const result = await this.loginUseCase.execute(body);
    return this.authService.generateToken(result.id)
  }
}
