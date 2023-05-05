import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";
import { Controller, HttpCode, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/models/dtos/create-user-dto";
import { AuthService } from "../providers/auth.service";
import { CheckDto, TryCatch, UserType } from "src/types";
import { Request } from "express";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { JwtUtil } from "src/providers/jwt.service";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { isErrorCheck } from "src/errors";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import {
  ALREADY_EXISTED_EMAIL,
  EMAIL_SEND_FAILED,
  LOCAL_REGISTER_FAILED,
  MODIFY_USER_FAILED,
  NOT_CORRECT_NUMBER,
  NOT_EXISTED_EMAIL,
  TOKEN_NOT_MATCH_USER
} from "src/errors/auth-error";
import { EmailVerifyDto } from "src/models/dtos/email-verify-dto";
import { EmailService } from "src/providers/email.service";
import { uuid } from "src/utils/uuid";
@Controller("auth")
export class AuthController {
  private readonly minute = 60;
  constructor(
    private readonly _authService: AuthService,
    private readonly _jwtUtil: JwtUtil,
    private readonly _emailService: EmailService
  ) {}
  /**
   * @summary 회원 가입 기능
   * @description 이메일이 중복되지 않는 새로운 유저를 만든다.
   *
   * @tag users
   * @param createUserDto 유저 생성하기 위한 Dto
   * @returns
   */
  @TypedRoute.Post("register")
  @HttpCode(201)
  public async register(
    @TypedBody() createUserDto: CreateUserDto
  ): Promise<TryCatch<any, ALREADY_EXISTED_EMAIL | LOCAL_REGISTER_FAILED>> {
    const result = await this._authService.create(createUserDto);
    if (isErrorCheck(result)) {
      return result;
    }
    const message = "회원가입에 성공했습니다.";

    return createResponseForm(null, message);
  }

  /**
   * 23-05-05 Refactoring 고민중 (현재 , status : true 랑 false 서비스 로직 성공 여부를 파악)
   * (중복시에는 false 를 return 해야하는데 data에 담아야 하나 , status 를 수정해야 하나 고민중)
   * @summary 이메일 , 닉네임 중복확인 기능
   * @description type (email,nickanme) 과 data 를 받아서 중복확인을 합니다.
   *
   * @tag users
   * @param type
   * @param data
   * @returns
   *
   */
  @TypedRoute.Get("check")
  @HttpCode(200)
  public async check(@TypedQuery() checkDto: CheckDto) {
    const { data, type } = checkDto;

    if (type === "email")
      return createResponseForm(
        await this._authService.checkDuplicateEmail(data)
      );
    else if (type === "nickname")
      return await this._authService.checkDuplicateNickname(data);
    else return false;
  }

  /**
   * @summary 토큰 재발급
   * @description Body 로 refreshToken 을 받아서 , 검증 후 accessToken 을 반환한다.
   *
   * @param req
   * @returns
   */
  @TypedRoute.Post("token/reissue")
  @HttpCode(201)
  @UseGuards(RefreshTokenGuard)
  public async refresh(
    @Req() req: Request
  ): Promise<TryCatch<UserType.ReissueResponse, TOKEN_NOT_MATCH_USER>> {
    const userId = req.data.jwtPayload.userId;
    const refreshToken = req.body.token;
    const result = await this._authService.validateUserToken(
      userId,
      refreshToken
    );
    if (isErrorCheck(result)) {
      return result;
    }
    const accessToken = this._jwtUtil.generateAccessToken(result.data);
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
   * @tag users
   * @param res
   * @returns
   *
   */
  @UseGuards(AccessTokenGuard)
  @TypedRoute.Post("logout")
  @HttpCode(201)
  public async logout(
    @Req() req: Request
  ): Promise<TryCatch<undefined, MODIFY_USER_FAILED>> {
    const jwtPayload = req.data.jwtPayload;
    const token = req.data.token;
    const result = await this._authService.logout(jwtPayload, token);
    if (isErrorCheck(result)) return result;
    return createResponseForm(undefined);
  }

  /**
   * @summary 비밀번호 초기화
   *
   * @param emailVerifyDto
   * @returns
   */

  @HttpCode(201)
  @TypedRoute.Post("/resetPassword")
  public async resetPassword(
    @TypedBody() emailVerifyDto: EmailVerifyDto
  ): Promise<
    TryCatch<
      undefined,
      | NOT_CORRECT_NUMBER
      | NOT_EXISTED_EMAIL
      | EMAIL_SEND_FAILED
      | MODIFY_USER_FAILED
    >
  > {
    const result = await this._emailService.authVerify(emailVerifyDto);
    if (isErrorCheck(result)) return result;
    const { email } = emailVerifyDto;
    const password = await uuid();
    const isChangePassword = await this._authService.changePassword(
      email,
      password
    );
    if (isErrorCheck(isChangePassword)) return isChangePassword;

    const isSendPassword = await this._emailService.sendPassword(
      email,
      password
    );
    if (isErrorCheck(isSendPassword)) return isSendPassword;

    return createResponseForm(undefined);
  }
}
