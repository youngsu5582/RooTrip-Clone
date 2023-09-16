import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { RedisCacheService } from "src/database/redis/redis.service";
import { EMAIL_SEND_FAILED, NOT_CORRECT_NUMBER } from "src/errors/auth-error";
import { EmailVerifyDto } from "src/models/dtos/email-verify-dto";
import { randomNumber } from "src/utils/random";
import typia from "typia";
import { generateRandomCode } from "../utils/redirectCode";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  private readonly _VerifySubject = "RooTrip 이메일 인증";
  private readonly _ResetSubject = "RooTrip 비밀번호 초기화";
  private readonly _serverUrl: string;
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _cacheService: RedisCacheService,
    private readonly _configService: ConfigService
  ) {
    this._serverUrl = `${this._configService.get(
      "app.host"
    )}:${this._configService.get("app.port")}`;
  }
  public async sendVerify(email: string) {
    const verifyNumber = randomNumber();
    const mailOptions = {
      from: "RooTripEmail@gmail.com",
      to: email,
      subject: this._VerifySubject,
      html: `<h1>${verifyNumber}</h1>`
    };

    await this._cacheService.addVerify(email, verifyNumber);
    try {
      await this._mailerService.sendMail(mailOptions);
      return true;
    } catch {
      return typia.random<EMAIL_SEND_FAILED>();
    }
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
    try {
      await this._mailerService.sendMail(mailOptions);
      return true;
    } catch {
      return typia.random<EMAIL_SEND_FAILED>();
    }
  }
  public async sendAuthentication(email: string) {
    const redirectCode = generateRandomCode();
    const mailOptions = {
      from: "RooTripEmail@gmail.com",
      to: email,
      subject: this._VerifySubject,
      html: `<h1>${this._serverUrl}/api/auth/verify/callback?code=${redirectCode}</h1>`
    };
    try {
      await this._mailerService.sendMail(mailOptions);
      return redirectCode;
    } catch {
      throw typia.random<EMAIL_SEND_FAILED>();
    }
  }
}
