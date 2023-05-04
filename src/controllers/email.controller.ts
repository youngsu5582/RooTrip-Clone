import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller, HttpCode } from "@nestjs/common";
import { isErrorCheck } from "src/errors";
import { EMAIL_SEND_FAILED } from "src/errors/auth-error";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import { EmailSendDto } from "src/models/dtos/email-sned-dto";

import { EmailService } from "src/providers/email.service";
import { TryCatch } from "src/types";
@Controller("email")
export class EmailController {
  constructor(private readonly _emailService: EmailService) {}

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
  ): Promise<TryCatch<any, EMAIL_SEND_FAILED>> {
    const { email } = emailSendDto;
    const result = await this._emailService.sendVerify(email);
    if (isErrorCheck(result)) {
      return result;
    }
    return createResponseForm(null);
  }
}
