import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateAccountUser } from "../application/use-cases/create-account-user.use-case";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Login } from "../application/use-cases/login.use-case";
import { AuthService } from "src/shared/infrastructure/authentication/auth.service";
import { LoginDTO } from "./dto/login-dto";

@Controller('user')
export class UserController {

  constructor(private readonly authService: AuthService) { }

  @Inject(CreateAccountUser.UseCase)
  private createAccountUseCase: CreateAccountUser.UseCase

  @Inject(Login.UseCase)
  private loginUseCase: Login.UseCase

  @Post('create')
  async createAccount(@Body() body: CreateUserDTO) {
    return this.createAccountUseCase.execute(body)
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const result = await this.loginUseCase.execute(body);
    return this.authService.generateToken(result.id)
  }
}
