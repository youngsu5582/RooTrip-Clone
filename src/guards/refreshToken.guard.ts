import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { extractRefreshToken } from "src/utils/token";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  private readonly jwtRefreshSecret;
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    private readonly _configService: ConfigService
  ) {
    this.jwtRefreshSecret = this._configService.get("app.jwtRefreshSecret");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const token = extractRefreshToken(req);
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: this.jwtRefreshSecret
      });

      req.data = {
        jwtPayload,
        token
      };
      return true;
    } catch (err) {
      return false;
    }
  }
}
