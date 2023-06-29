import { Module } from "@nestjs/common";
import { EmailController } from "src/controllers/email.controller";
import { RedisCacheModule } from "src/database/redis/redis.module";
import { EmailService } from "src/providers/email.service";
import { AuthModule } from "./auth.module";
import { AuthService } from "../providers/auth.service";
import { UsersRepository } from "../models/repositories/user.repository";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { ProfileRepository } from "../models/repositories/profile.repository";
@Module({
  imports: [
    RedisCacheModule,
    AuthModule,
    CustomTypeOrmModule.forCustomRepository([
      UsersRepository,
      ProfileRepository
    ])
  ],
  controllers: [EmailController],
  providers: [EmailService, AuthService],
  exports: [EmailService]
})
export class EmailModule {}
