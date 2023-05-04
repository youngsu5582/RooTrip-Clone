import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { RedisCacheService } from "src/database/redis/redis.service";
import { EMAIL_SEND_FAILED } from "src/errors/auth-error";

import typia from "typia";

@Injectable()
export class EmailService {
  private readonly _VerifySubject = "RooTrip 이메일 인증";

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
    this._cacheService.addVerify(email, verifyNumber);
    const result = await this._mailerService.sendMail(mailOptions);
    //.catch(()=>null);
    if (result) return true;
    else return typia.random<EMAIL_SEND_FAILED>();
  }
}
