import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../models/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly _usersRepository: UsersRepository) {}
  async saveRefreshToken(id: string, refreshToken: string) {
    return await this._usersRepository.update({ id }, { refreshToken });
  }
  async getUserById(id: string) {
    return await this._usersRepository.findOne({ where: { id } });
  }
}
