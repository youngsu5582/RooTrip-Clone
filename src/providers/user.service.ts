import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../models/repositories/user.repository";
import typia from "typia";
import { MODIFY_USER_FAILED } from "src/errors/auth-error";

@Injectable()
export class UserService {
  constructor(private readonly _usersRepository: UsersRepository) {}
  async saveRefreshToken(id: string, refreshToken: string) {
    try {
      return await this._usersRepository.update({ id }, { refreshToken });
    } catch {
      return typia.random<MODIFY_USER_FAILED>();
    }
  }
  async getUserById(id: string) {
    return await this._usersRepository.findOne({ where: { id } });
  }
}
