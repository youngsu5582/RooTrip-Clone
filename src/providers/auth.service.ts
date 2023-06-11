import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { User } from "../models/tables/user.entity";
import { CreateUserDto } from "../models/dtos/create-user-dto";
import {
  CheckDuplicateDto,
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
  SOCIAL_REGISTER_FAILED
} from "src/errors/auth-error";
import { RedisCacheService } from "src/database/redis/redis.service";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository,
    private readonly _cacheService: RedisCacheService
  ) {}
  async localRegister(createUserDto: CreateUserDto) {
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
  async checkDuplicate(checkDuplicateDto: CheckDuplicateDto) {
    const { checkType, value } = checkDuplicateDto;
    try {
      if (checkType === "email")
        return Boolean(await this._userRepository.getByEmail(value));
      else return Boolean(await this._userRepository.getByNickname(value));
    } catch {
      return false;
    }
  }
  async logout(jwtPayload: CustomJwtPayload, token: string) {
    const expiresIn = jwtPayload.exp - jwtPayload.iat;
    await this._cacheService.addBlacklist(token, expiresIn);
    try {
      await this._userRepository.deleteRefreshTokenById(jwtPayload.userId);
      return true;
    } catch {
      return typia.random<MODIFY_USER_FAILED>();
    }
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
  async validateRefreshToken(id: string, refreshToken: string) {
    return await this._userRepository.findOne({
      where: { id, refreshToken }
    });
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
