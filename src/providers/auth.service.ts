import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { User } from "../models/tables/user.entity";
import { CreateUserDto } from "../models/dtos/create-user-dto";
import {
  CustomJwtPayload,
  ServiceResponseForm,
  SocialLoginType
} from "src/types";
import typia from "typia";
import {
  ALREADY_EXISTED_EMAIL,
  LOCAL_REGISTER_FAILED,
  SOCIAL_REGISTER_FAILED,
  TOKEN_NOT_MATCH_USER
} from "src/errors/auth-error";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const alreadyCreatedEmail = await this._userRepository.findOne({
      where: { email }
    });
    if (alreadyCreatedEmail && email !== null)
      return typia.random<ALREADY_EXISTED_EMAIL>();
    const user = await this._userRepository
      .save(User.create({ ...createUserDto }))
      .catch(() => null);

    if (user) {
      return true
    } 
    else
      return typia.random<LOCAL_REGISTER_FAILED>();  
  }
  async checkDuplicateEmail(email: string) {
    return Boolean(!(await this._userRepository.getByEmail(email)));
  }
  async checkDuplicateNickname(nickname: string) {
    return Boolean(!(await this._userRepository.getByNickname(nickname)));
  }
  async logout(jwtPayload: CustomJwtPayload) {
    return await this._userRepository.deleteRefreshTokenById(jwtPayload.userId);
  }
  async socialRegister(createUserDto: SocialLoginType) {
    const user = await this._userRepository.save({ ...createUserDto });
    if (user) {
      return {
        status: true,
        data: user
      } as ServiceResponseForm;
    } else return typia.random<SOCIAL_REGISTER_FAILED>();
  }
  async validateUserToken(id: string, refreshToken: string) {
    const user = await this._userRepository.findOne({
      where: { id, refreshToken }
    });
    if (user)
      return {
        status: true,
        data: user
      } as ServiceResponseForm;
    else return typia.random<TOKEN_NOT_MATCH_USER>();
  }
}
