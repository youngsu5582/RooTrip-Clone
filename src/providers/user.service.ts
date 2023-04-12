import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/models/repositories/user.repository";
import User from "src/models/tables/user.entity";


@Injectable()
export class UserService{
    constructor(
    @InjectRepository(User) private readonly _userRepository :UsersRepository
    ){}
}