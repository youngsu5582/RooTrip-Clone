import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoginUserDto } from "src/models/dtos/login-user-dto";
import { SocialDto } from "src/models/dtos/social-dto";
import { User } from "src/models/tables/user.entity";
import { AuthService } from "src/providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { LoginService } from "src/providers/login.service";
import { UserService } from "src/providers/user.service";

@Controller("auth")
export class LoginController {
  private readonly minute = 60;

  constructor(
    private readonly _loginService: LoginService,
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _jwtUtil: JwtUtil
  ) {}

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
    const { accessToken, refreshToken } = this._jwtUtil.generateToken({
      userId: user.id
    });
    console.log(accessToken, refreshToken);
    await this._userService.saveRefreshToken(user.id, refreshToken);

    return Object.assign({
      status: result.status,
      expire: 15 * this.minute,
      accessToken,
      refreshToken
    });
  }
  @TypedRoute.Post("social")
  async socialLogin(@TypedBody() socialDto: SocialDto) {
    console.log(socialDto);
    return true;
  }
}
