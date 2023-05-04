import { Module } from "@nestjs/common";
import { EmailController } from "src/controllers/email.controller";
import { RedisCacheModule } from "src/database/redis/redis.module";
import { EmailService } from "src/providers/email.service";

@Module({
  imports: [RedisCacheModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
