import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { isErrorCheck } from "src/errors";
import { createResponseForm } from "src/interceptors/transform.interceptor";
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
    const user = result.data as User;
    const { accessToken, refreshToken } = this._jwtUtil.generateToken(user);
    await this._userService.saveRefreshToken(user.id, refreshToken);
    const data = {
      expire: 15 * this.minute,
      status: result.status,
      accessToken,
      refreshToken
    };
    return createResponseForm(data);
  }

  /**
   *
   * @summary 소셜 로그인 기능
   * @description 사용자가 로그인하여 받은 code 와 무슨 소셜인지 구분하는 provider를 이용해 로그인 한다.
   * @tag users
   * @param socialDto
   * @returns
   */
  @TypedRoute.Post("social")
  async socialLogin(@TypedBody() socialDto: SocialDto) {
    const { code, provider } = socialDto;
    let userInfo;
    if (provider === "kakao") userInfo = this._loginService.kakaoLogin(code);
    let user = await this._userService.getUserById(userInfo.id);
    if (!user) {
      const result = await this._authService.socialRegister(userInfo);
      if (isErrorCheck(result)) return result;
      user = result.data;
    }
    const { accessToken, refreshToken } = this._jwtUtil.generateToken(user);
    await this._userService.saveRefreshToken(user.id, refreshToken);
    const data = {
      expire: 15 * this.minute,
      accessToken,
      refreshToken
    };
    return createResponseForm(data);
  }
}
