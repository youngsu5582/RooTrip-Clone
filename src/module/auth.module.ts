import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { AuthController } from "../controllers/auth.controller";
import { UsersRepository } from "../models/repositories/user.repository";
import { AuthService } from "../providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { RedisCacheModule } from "src/database/redis/redis.module";
import { EmailModule } from "./email.module";
import { EmailService } from "src/providers/email.service";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([UsersRepository]),
    RedisCacheModule,
    EmailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, EmailService],
  exports: [AuthService]
})
export class AuthModule {}
