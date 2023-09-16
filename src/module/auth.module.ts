import { Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { UsersRepository } from "../models/repositories/user.repository";
import { AuthService } from "../providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { RedisCacheModule } from "src/database/redis/redis.module";
import { ProfileRepository } from "src/models/repositories/profile.repository";
import { EmailService } from "../providers/email.service";
import { CustomTypeOrmModule } from "../database/typeorm/custom-typeorm.module";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      UsersRepository,
      ProfileRepository
    ]),
    RedisCacheModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, EmailService],
  exports: [AuthService]
})
export class AuthModule {}
