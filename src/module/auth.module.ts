import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { AuthController } from "../controllers/auth.controller";
import { UsersRepository } from "../models/repositories/user.repository";
import { AuthService } from "../providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { RedisCacheModule } from "src/database/redis/redis.module";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([UsersRepository]),
    RedisCacheModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil],
  exports: [AuthService]
})
export class AuthModule {}
