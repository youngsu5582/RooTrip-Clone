import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/models/dtos/login-user-dto";
import { User } from "src/models/tables/user.entity";
import { LoginService } from "src/providers/login.service";
import { UserService } from "src/providers/user.service";

@Controller("auth")
export class LoginController {
  private readonly minute = 60;
  private readonly jwtAccessSecret;
  private readonly jwtRefreshSecret;
  constructor(
    private readonly _loginService: LoginService,
    private readonly _userService: UserService,
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService
  ) {
    this.jwtAccessSecret = this._configService.get("app.jwtAccessSecret");
    this.jwtRefreshSecret = this._configService.get("app.jwtRefreshSecret");
  }

  /**
   * @summary 로그인 기능
   * @description 이메일과 비밀번호를 이용해 로그인 한다.
   * @tag users
   * @param loginUserDto 로그인 하기 위한 Dto
   * @returns
   */
  @TypedRoute.Post("login")
  async localLogin(@TypedBody() loginUserDto: LoginUserDto) {
    const result = await this._loginService.localLogin(loginUserDto);
    if (result.status === false) return result;
    const user = result.data as User;
    const { id } = user;

    const accessToken = this._jwtService.sign(
      { userId: user.id },
      {
        secret: this.jwtAccessSecret
      }
    );
    const refreshToken = this._jwtService.sign(
      { userId: user.id },
      {
        secret: this.jwtRefreshSecret
      }
    );
    await this._userService.saveRefreshToken(id, refreshToken);
    return {
      status: result.status,
      expire: 15 * this.minute,
      accessToken,
      refreshToken
    };
  }
}
