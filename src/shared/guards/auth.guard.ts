import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../infrastructure/authentication/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { request, headers } = this.handleHttp(context);

    const { type, token } = this.extractTokenFromHeader(headers);

    const userId = await this.validateToken(type, token);

    request.user = {
      id: userId
    }

    return true
  }

  private extractTokenFromHeader(headers: any) {
    const { authorization } = headers;

    if (!authorization) throw new UnauthorizedException('Token not found.');

    const [type, token] = authorization.split(' ');

    return {
      type, token
    }
  }

  private handleHttp(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    return {
      request,
      headers
    }
  }

  private async validateToken(type: string, token: string): Promise<string> {

    if (type.toLowerCase() != 'bearer') throw new UnauthorizedException("Invalid type token.");

    try {
      const { sub: userId } = await this.authService.verifyJwt(token);
      return String(userId)
    } catch (error) {
      const message = error?.message ?? 'Invalid or expired token.'
      throw new UnauthorizedException(message);
    }
  }
}