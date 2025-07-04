import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../authentication/auth.service";
import { Reflector } from "@nestjs/core";
import { Public } from "../decorators/public";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const IS_PUBLIC = this.reflector.get(Public, context.getHandler());

    const { request, headers } = this.handleHttp(context);

    try {

      const { type, token } = this.extractTokenFromHeader(headers);

      const userId = await this.validateToken(type, token);

      request.user = {
        id: userId
      }

    } catch (error) {
      if (IS_PUBLIC) {
        return true
      }
      throw new UnauthorizedException(error.message ?? 'Token not found.')
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