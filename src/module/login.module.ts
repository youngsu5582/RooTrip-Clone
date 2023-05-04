import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginController } from "src/controllers/login.controller";
import { LoginService } from "src/providers/login.service";
import { UserService } from "src/providers/user.service";
import { AuthService } from "src/providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { RedisCacheModule } from "src/database/redis/redis.module";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([UsersRepository]),
    RedisCacheModule
  ],
  controllers: [LoginController],
  providers: [LoginService, UserService, AuthService, JwtUtil],
  exports: [LoginService]
})
export class LoginModule {}
