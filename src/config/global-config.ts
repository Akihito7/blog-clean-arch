import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "src/shared/infrastructure/authentication/auth.service";
import { AuthGuard } from "src/shared/infrastructure/guards/auth.guard";

export function useGlobalConfig(app: INestApplication) {
  const authService = app.get(AuthService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(authService, reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
}