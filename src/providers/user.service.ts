import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/models/repositories/user.repository";
import { User } from "src/models/tables/user.entity";
import { CreateUserDto } from "../models/dtos/create-user-dto";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: UsersRepository
  ) {}
  async create(createUserDto: CreateUserDto) {
    this._userRepository.save({ ...createUserDto });
  }
}
