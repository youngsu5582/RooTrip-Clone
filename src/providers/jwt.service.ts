// jwt.utils.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/models/tables/user.entity";
import { CustomJwtPayload } from "src/types";

@Injectable()
export class JwtUtil {
  private readonly _jwtAccessSecret;
  private readonly _jwtRefreshSecret;
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService
  ) {
    this._jwtAccessSecret = this._configService.get("app.jwtAccessSecret");
    this._jwtRefreshSecret = this._configService.get("app.jwtRefreshSecret");
  }

  generateAccessToken(user: User): string {
    return this._jwtService.sign(
      { userId: user.id },
      {
        secret: this._jwtAccessSecret,
        expiresIn: "15m"
      }
    );
  }
  generateRefreshToken(user: User): string {
    return this._jwtService.sign(
      { userId: user.id },
      {
        secret: this._jwtRefreshSecret,
        expiresIn: "1d"
      }
    );
  }
  decodeAccessToken(accessToken: string) {
    return this._jwtService.verify(
      accessToken,
      this._jwtAccessSecret
    ) as CustomJwtPayload;
  }
  decodeRefreshToken(refreshToken: string) {
    return this._jwtService.verify(
      refreshToken,
      this._jwtRefreshSecret
    ) as CustomJwtPayload;
  }
  generateToken(payload: any) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return {
      accessToken,
      refreshToken
    };
  }
}
