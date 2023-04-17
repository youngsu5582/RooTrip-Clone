import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginController } from "src/controllers/login.controller";
import { LoginService } from "src/providers/login.service";

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UsersRepository])],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule {}
