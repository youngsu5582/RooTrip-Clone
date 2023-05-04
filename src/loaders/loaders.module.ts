import { Module } from "@nestjs/common";
import { LoggerModule } from "./winston.module";
import { MailModule } from "./mailer.module";

@Module({
  imports: [LoggerModule, MailModule],
  exports: [LoggerModule, MailModule]
})
export class LoadersModule {}
