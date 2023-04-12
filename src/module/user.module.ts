import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "src/config/typeorm/custom-typeorm.module";
import { UserController } from "src/controllers/user.controller";
import { UsersRepository } from "src/models/repositories/user.repository";
import { UserService } from "src/providers/user.service";

@Module({
    imports:[CustomTypeOrmModule.forCustomRepository([UsersRepository])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService],
})
export class UserModule{}