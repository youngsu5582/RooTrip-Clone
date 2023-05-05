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
  MODIFY_USER_FAILED,
  NOT_EXISTED_EMAIL,
  SOCIAL_REGISTER_FAILED,
  TOKEN_NOT_MATCH_USER
} from "src/errors/auth-error";
import { RedisCacheService } from "src/database/redis/redis.service";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository,
    private readonly _cacheService: RedisCacheService
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
      return true;
    } else return typia.random<LOCAL_REGISTER_FAILED>();
  }
  async checkDuplicateEmail(email: string) {
    return Boolean(!(await this._userRepository.getByEmail(email)));
  }
  async checkDuplicateNickname(nickname: string) {
    return Boolean(!(await this._userRepository.getByNickname(nickname)));
  }
  async logout(jwtPayload: CustomJwtPayload, token: string) {
    const expiresIn = jwtPayload.exp - jwtPayload.iat;
    await this._cacheService.addBlacklist(token, expiresIn);
    const result = await this._userRepository.deleteRefreshTokenById(
      jwtPayload.userId
    );
    if (result) return true;
    else return typia.random<MODIFY_USER_FAILED>();
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
  async changePassword(email: string, newPassword: string) {
    try {
      const user = await this._userRepository.findOne({ where: { email } });
      if (user) {
        user.password = newPassword;
        await this._userRepository.save(user);
        return true;
      } else return typia.random<NOT_EXISTED_EMAIL>();
    } catch {
      return typia.random<MODIFY_USER_FAILED>();
    }
  }
}
