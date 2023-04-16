import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { AuthController } from "../controllers/auth.controller";
import { UsersRepository } from "../models/repositories/user.repository";
import { AuthService } from "../providers/auth.service";

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UsersRepository])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
