import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepositoryInMemory } from "./database/in-memory/user.repository-in-memory";
import { BcryptProvider } from "src/shared/infrastructure/providers/bcrypt.provider";
import { CreateAccountUser } from "../application/use-cases/create-account-user.use-case";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { HashProviderInterface } from "src/shared/application/providers/hash-provider.interface";
import { Login } from "../application/use-cases/login.use-case";
import { AuthModule } from "src/shared/infrastructure/authentication/auth.module";
import { EnvConfigService } from "src/shared/infrastructure/env-config/env-config.service";
import { GetUser } from "../application/use-cases/get-user.use-case";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";

@Module({
  imports: [AuthModule, RepositoriesInMemoryModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'HashProvider',
      useClass: BcryptProvider
    },
    {
      provide: CreateAccountUser.UseCase,
      useFactory: (userRepository: UserRepositoryInterface, hashProvider: HashProviderInterface) => {
        return new CreateAccountUser.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: Login.UseCase,
      useFactory: (userRepository: UserRepositoryInterface, hashProvider: HashProviderInterface) => {
        return new Login.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: GetUser.UseCase,
      useFactory: (userRepository: UserRepositoryInterface) => {
        return new GetUser.UseCase(userRepository)
      },
      inject: ['UserRepository']
    },
    EnvConfigService
  ]
})
export class UserModule { }