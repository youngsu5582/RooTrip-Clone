import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller, HttpCode } from "@nestjs/common";
import { isErrorCheck } from "src/errors";
import { EMAIL_SEND_FAILED, NOT_CORRECT_NUMBER } from "src/errors/auth-error";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import { EmailSendDto } from "src/models/dtos/email-sned-dto";
import { EmailVerifyDto } from "src/models/dtos/email-verify-dto";
import { EmailService } from "src/providers/email.service";
import { TryCatch } from "src/types";
import { uuid } from "../utils/uuid";
import { AuthService } from "../providers/auth.service";
import typia from "typia";
@Controller("email")
export class EmailController {
  constructor(
    private readonly _emailService: EmailService,
    private readonly _authService: AuthService
  ) {}

  /**
   * @summary 인증 메일 전송
   * @description 회원가입시 인증을 위한 메일을 보낸다
   *
   * @tag email
   * @param emailVerifyDto
   * @returns
   */
  @TypedRoute.Post("verify/send")
  @HttpCode(201)
  public async verifySend(
    @TypedBody() emailSendDto: EmailSendDto
  ): Promise<TryCatch<undefined, EMAIL_SEND_FAILED>> {
    const { email } = emailSendDto;
    const result = await this._emailService.sendVerify(email);
    if (isErrorCheck(result)) {
      return result;
    }
    return createResponseForm(undefined);
  }

  /**
   * @summary 인증 메일 검증
   * @description 보낸 메일 과 동일한지 검증한다
   *
   * @tag email
   * @param emailVerifyDto
   * @retunrs
   */
  @TypedRoute.Post("verify/auth")
  @HttpCode(201)
  public async verifyAuth(
    @TypedBody() emailVerifyDto: EmailVerifyDto
  ): Promise<TryCatch<undefined, NOT_CORRECT_NUMBER>> {
    const result = await this._emailService.authVerify(emailVerifyDto);

    if (isErrorCheck(result)) return result;
    return createResponseForm(undefined);
  }

  /**
   * @summary 비밀번호 초기화 메일 전송
   * @description 인증 번호 와 이메일이 동일한지 검증 후 , 비밀번호 를 초기화 하고 이메일을 보낸다
   *
   * @tag email
   * @param emailVerifyDto
   * @retunrs
   */
  @TypedRoute.Post("resetPassword")
  @HttpCode(201)
  public async resetPassword(
    @TypedBody() emailVerifyDto: EmailVerifyDto
  ): Promise<TryCatch<undefined, NOT_CORRECT_NUMBER | EMAIL_SEND_FAILED>> {
    const result = await this._emailService.authVerify(emailVerifyDto);
    if (isErrorCheck(result)) return result;
    const { email } = emailVerifyDto;
    const password = await uuid();
    try {
      await this._authService.changePassword(email, password);
      await this._emailService.sendPassword(email, password);
      return createResponseForm(undefined);
    } catch {
      return typia.random<EMAIL_SEND_FAILED>();
    }
  }
}
