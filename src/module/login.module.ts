import { Module } from "@nestjs/common";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginController } from "src/controllers/login.controller";
import { LoginService } from "src/providers/login.service";
import { UserService } from "src/providers/user.service";
import { AuthService } from "src/providers/auth.service";
import { JwtUtil } from "src/providers/jwt.service";
import { RedisCacheModule } from "src/database/redis/redis.module";
import { ProfileRepository } from "src/models/repositories/profile.repository";
import { CustomTypeOrmModule } from "../database/typeorm/custom-typeorm.module";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      UsersRepository,
      ProfileRepository
    ]),
    RedisCacheModule
  ],
  controllers: [LoginController],
  providers: [LoginService, UserService, AuthService, JwtUtil],
  exports: [LoginService]
})
export class LoginModule {}
