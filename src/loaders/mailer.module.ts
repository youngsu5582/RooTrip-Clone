import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>("app.emailUser"),
            pass: configService.get<string>("app.emailPassword")
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  exports: [MailerModule]
})
export class MailModule {}
