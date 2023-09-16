import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { User } from "../models/tables/user.entity";
import {
  CheckDuplicateDto,
  CustomJwtPayload,
  SocialLoginType
} from "src/types";
import typia from "typia";
import {
  ALREADY_EXISTED_EMAIL,
  LOCAL_REGISTER_FAILED,
  MODIFY_USER_FAILED,
  NOT_EXISTED_EMAIL,
  NOT_VALIDATE_CODE,
  SOCIAL_REGISTER_FAILED
} from "src/errors/auth-error";
import { RedisCacheService } from "src/database/redis/redis.service";
import { ProfileRepository } from "src/models/repositories/profile.repository";
import Profile from "src/models/tables/profile.entity";
import { CreateLocalUserDto } from "src/models/dtos/user/create-local-user-dto";
import { DB_CONNECT_FAILED } from "src/errors/common-error";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository,
    @InjectRepository(ProfileRepository)
    private readonly _profileRepository: ProfileRepository,
    private readonly _cacheService: RedisCacheService,
    private readonly _mailerService: MailerService
  ) {}
  async localRegister(code: string, createUserDto: CreateLocalUserDto) {
    const { email } = createUserDto;
    const alreadyCreatedEmail = await this._userRepository.findOne({
      where: { email }
    });
    if (alreadyCreatedEmail && email !== null)
      return typia.random<ALREADY_EXISTED_EMAIL>();
    try {
      return this._cacheService.addTemporalRegister(
        code,
        JSON.stringify(createUserDto)
      );
      // const user = await this._userRepository.save(
      //   User.create({ email, password })
      // );
      // await this._profileRepository
      //   .save(Profile.create({ userId: user.id, ...profileDto }))
      //   .then((profile) => (user.profile = profile));
      // user.save();
      //return user;
    } catch {
      return typia.random<LOCAL_REGISTER_FAILED>();
    }
  }
  async checkDuplicate(checkDuplicateDto: CheckDuplicateDto) {
    const { checkType, value } = checkDuplicateDto;
    try {
      if (checkType === "email")
        return Boolean(await this._userRepository.getByEmail(value));
      else return Boolean(await this._profileRepository.getByNickname(value));
    } catch {
      return typia.random<DB_CONNECT_FAILED>();
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
    const { id, name } = createUserDto;
    try {
      const user = await this._userRepository.save(User.create({ id }));
      await this._profileRepository
        .save(this._profileRepository.create({ userId: user.id, name }))
        .then((profile) => (user.profile = profile));
      user.save();
      return user;
    } catch {
      return typia.random<SOCIAL_REGISTER_FAILED>();
    }
  }
  async validateRefreshToken(id: string, refreshToken: string) {
    return await this._userRepository.findOne({
      where: { id, refreshToken }
    });
  }

  async changePassword(email: string, newPassword: string) {
    try {
      const user = await this._userRepository.getByEmail(email);
      if (user) {
        user.password = newPassword;
        await this._userRepository.save(user);
        return true;
      } else return typia.random<NOT_EXISTED_EMAIL>();
    } catch {
      return typia.random<MODIFY_USER_FAILED>();
    }
  }
  async completeRegister(code: string) {
    const data = await this._cacheService.getTemporalRegister(code);
    if (!data) return typia.random<NOT_VALIDATE_CODE>();
    const createUserData: CreateLocalUserDto = JSON.parse(data);
    const { email, password, ...profileDto } = createUserData;
    try {
      const user = await this._userRepository.save(
        User.create({ email, password })
      );
      await this._profileRepository
        .save(Profile.create({ userId: user.id, ...profileDto }))
        .then((profile) => (user.profile = profile));
      user.save();
      return user;
    } catch {
      return true;
    }
  }
  // async checkExistedEmail(email: string) {
  //   try{
  //     const alreadyCreatedEmail = await this._userRepository.findOne({
  //       where: { email }
  //     });
  //     if(alreadyCreatedEmail)
  //   }
  // }
}
