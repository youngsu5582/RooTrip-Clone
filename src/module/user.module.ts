import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { UserController } from "../controllers/user.controller";
import { UsersRepository } from "../models/repositories/user.repository";
import { UserService } from "../providers/user.service";

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UsersRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
