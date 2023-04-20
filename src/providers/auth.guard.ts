import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { extractAccessToken } from "src/utils/token";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly jwtAccessSecret;
  private readonly jwtRefreshSecret;
  constructor(
    private reflector: Reflector,
    @Inject(JwtService) private jwtService: JwtService,
    private readonly _configService: ConfigService
  ) {
    this.jwtAccessSecret = this._configService.get("app.jwtAccessSecret");
    this.jwtRefreshSecret = this._configService.get("app.jwtRefreshSecret");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse() as Response;

    const token = extractAccessToken(req);

    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: this.jwtAccessSecret
      });
      console.log(jwtPayload);
      res.locals.jwtPayload = jwtPayload;
      res.locals.token = token;

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
