import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";
import { Controller, HttpCode, UseGuards } from "@nestjs/common";
import { AuthService } from "../providers/auth.service";
import { CheckDuplicateDto, CustomJwtPayload, TryCatch } from "src/types";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { JwtUtil } from "src/providers/jwt.service";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { isErrorCheck } from "src/errors";
import {
  createErrorForm,
  createResponseForm
} from "src/interceptors/transform.interceptor";
import {
  ALREADY_EXISTED_EMAIL,
  LOCAL_REGISTER_FAILED,
  MODIFY_USER_FAILED,
  TOKEN_NOT_MATCH_USER
} from "src/errors/auth-error";
import typia from "typia";
import { CreateLocalUserDto } from "src/models/dtos/user/create-local-user-dto";
import { DB_CONNECT_FAILED } from "src/errors/common-error";
import { UserId } from "src/decorator/param/user-id.decorator";
import { Token } from "src/decorator/param/token.decorator";
import { JwtPayload } from "src/decorator/param/jwt-payload.decorator";
import { CountApiUsage } from "src/decorator/function/count-api-usage.decorator";
import { UserResponse } from "../responses/user-response";

/**
 * 2023.06.18 해당 코드에서는 사용하지 않으나 , Swagger 에서 인식하기 위해 추가만 해놓음. (삭제 고려)
 */
export type RefreshTokenDto = {
  grant_type: "refresh_token";
  refresh_token: string;
};
@Controller("auth")
export class AuthController {
  private readonly minute = 60;
  constructor(
    private readonly _authService: AuthService,
    private readonly _jwtUtil: JwtUtil
  ) {}
  /**
   * 회원 가입 기능
   *
   * 이메일이 중복되지 않는 새로운 유저를 만든다.
   *
   * @tag auth
   * @param createUserDto 유저 생성하기 위한 Dto
   * @returns 새로 생성된 유저
   */

  @TypedRoute.Post("register")
  @HttpCode(201)
  public async register(
    @TypedBody() createLocalUserDto: CreateLocalUserDto
  ): Promise<
    TryCatch<undefined, ALREADY_EXISTED_EMAIL | LOCAL_REGISTER_FAILED>
  > {
    const result = await this._authService.localRegister(createLocalUserDto);
    if (isErrorCheck(result)) {
      return createErrorForm(result);
    }
    const message = "회원가입에 성공했습니다.";

    return createResponseForm(undefined, message);
  }

  /**
   * 23-05-05 Refactoring 고민중 (현재 , status : true 랑 false 서비스 로직 성공 여부를 파악)
   * (중복시에는 false 를 return 해야하는데 data에 담아야 하나 , status 를 수정해야 하나 고민중)
   * @summary 이메일 , 닉네임 중복확인 기능
   * @description type (email,nickanme) 과 data 를 받아서 중복확인을 합니다.
   *
   * @tag auth
   * @param checkDuplicateDto 체크 타입을 위한 Dto
   * @returns
   *
   */

  @TypedRoute.Get("check")
  @HttpCode(200)
  @CountApiUsage()
  public async check(
    @TypedQuery() checkDuplicateDto: CheckDuplicateDto
  ): Promise<TryCatch<boolean, DB_CONNECT_FAILED>> {
    const result = await this._authService.checkDuplicate(checkDuplicateDto);
    if (isErrorCheck(result)) return createErrorForm(result);
    return createResponseForm(result);
  }

  /**
   * @summary 토큰 재발급
   * @description Body 로 refreshToken 을 받아서 , 검증 후 accessToken 을 반환한다.
   *
   * @tag auth
   * @param refreshTokenDto 토큰 재발급 받기 위한 Dto
   * @returns
   */
  @UseGuards(RefreshTokenGuard)
  @TypedRoute.Post("token/reissue")
  @HttpCode(201)
  public async refresh(
    @TypedBody() refreshTokenDto: RefreshTokenDto,
    @UserId() userId: string,
    @Token() refreshToken: string
  ): Promise<TryCatch<UserResponse.reissue, TOKEN_NOT_MATCH_USER>> {
    refreshTokenDto;

    //console.log(temp);
    const user = await this._authService.validateRefreshToken(
      userId,
      refreshToken
    );
    if (!user) return createErrorForm(typia.random<TOKEN_NOT_MATCH_USER>());
    const accessToken = this._jwtUtil.generateAccessToken(user);
    const data = {
      expire: 15 * this.minute,
      accessToken
    };
    return createResponseForm(data);
  }

  /**
   * @summary 로그아웃 기능
   * @description Header 에 있는 Token 을 활용하여 로그아웃을 합니다.
   *
   * @tag auth
   * @param res
   * @returns
   *
   */

  @UseGuards(AccessTokenGuard)
  @TypedRoute.Post("logout")
  @HttpCode(201)
  public async logout(
    @JwtPayload() jwtPayload: CustomJwtPayload,
    @Token() token: string
  ): Promise<TryCatch<undefined, MODIFY_USER_FAILED>> {
    const result = await this._authService.logout(jwtPayload, token);
    if (isErrorCheck(result)) return result;
    return createResponseForm(undefined);
  }
}
