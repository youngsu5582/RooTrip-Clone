import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { isErrorCheck } from "src/errors";
import {
  NOT_CORRECT_PASSWORD,
  NOT_EXISTED_EMAIL,
  SOCIAL_REGISTER_FAILED
} from "src/errors/auth-error";
import { DB_CONNECT_FAILED } from "src/errors/common-error";
import {
  createErrorForm,
  createResponseForm
} from "src/interceptors/transform.interceptor";
import { SocialDto } from "src/models/dtos/social-dto";
import { LoginUserDto } from "src/models/dtos/user/login-user-dto";
import { AuthService } from "src/providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { LoginService } from "src/providers/login.service";
import { UserService } from "src/providers/user.service";
import { TryCatch } from "src/types";
import typia from "typia";
import { UserResponse } from "../responses/user-response";

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
  async localLogin(
    @TypedBody() loginUserDto: LoginUserDto
  ): Promise<
    TryCatch<UserResponse.login, NOT_CORRECT_PASSWORD | NOT_EXISTED_EMAIL>
  > {
    const user = await this._loginService.localLogin(loginUserDto);
    if (isErrorCheck(user)) return user;
    const { accessToken, refreshToken } = this._jwtUtil.generateToken(user);
    await this._userService.saveRefreshToken(user.id, refreshToken);
    const data = {
      expire: 15 * this.minute,
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
  async socialLogin(
    @TypedBody() socialDto: SocialDto
  ): Promise<
    TryCatch<UserResponse.login, SOCIAL_REGISTER_FAILED | DB_CONNECT_FAILED>
  > {
    const { code, provider } = socialDto;
    try {
      let userInfo: any & { id: string };
      if (provider === "kakao")
        userInfo = await this._loginService.kakaoLogin(code);
      else if (provider === "naver")
        userInfo = await this._loginService.naverLogin(code);
      let user = await this._userService.getUserById(userInfo.id);
      if (!user) {
        const result = await this._authService.socialRegister(userInfo);
        if (isErrorCheck(result)) return result;
        user = result;
      }

      const { accessToken, refreshToken } = this._jwtUtil.generateToken(user);
      await this._userService.saveRefreshToken(user!.id, refreshToken);
      const data = {
        expire: 15 * this.minute,
        accessToken,
        refreshToken
      };
      return createResponseForm(data);
    } catch {
      return createErrorForm(typia.random<DB_CONNECT_FAILED>());
    }
  }
}
