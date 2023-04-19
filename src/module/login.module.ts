import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginController } from "src/controllers/login.controller";
import { LoginService } from "src/providers/login.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/providers/user.service";


@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UsersRepository])],
  controllers: [LoginController],
  providers: [LoginService,JwtService,UserService,JwtService],
  exports: [LoginService],
})
export class LoginModule {}
