import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { RedisCacheService } from "src/database/redis/redis.service";
import { EMAIL_SEND_FAILED, NOT_CORRECT_NUMBER } from "src/errors/auth-error";
import { EmailVerifyDto } from "src/models/dtos/email-verify-dto";
import typia from "typia";

@Injectable()
export class EmailService {
  private readonly _VerifySubject = "RooTrip 이메일 인증";
  private readonly _ResetSubject = "RooTrip 비밀번호 초기화";
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _cacheService: RedisCacheService
  ) {}
  public async sendVerify(email: string) {
    const verifyNumber = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "5");
    const mailOptions = {
      from: "RooTripEmail@gmail.com",
      to: email,
      subject: this._VerifySubject,
      html: `<h1>${verifyNumber}</h1>`
    };
    await this._cacheService.addVerify(email, verifyNumber);
    const result = await this._mailerService
      .sendMail(mailOptions)
      .catch(() => null);
    if (result) return true;
    else return typia.random<EMAIL_SEND_FAILED>();
  }

  public async authVerify(emailVerifyDto: EmailVerifyDto) {
    const { email, verifyNumber } = emailVerifyDto;
    const checkNumber = await this._cacheService.checkVerify(email);
    if (verifyNumber === checkNumber) return true;
    else return typia.random<NOT_CORRECT_NUMBER>();
  }
  public async sendPassword(email: string, password: string) {
    const mailOptions = {
      from: "RooTripEmail@gmail.com",
      to: email,
      subject: this._ResetSubject,
      html: `<h1>${password}</h1>`
    };
    const result = await this._mailerService
      .sendMail(mailOptions)
      .catch(() => null);
    if (result) return true;
    else return typia.random<EMAIL_SEND_FAILED>();
  }
}
