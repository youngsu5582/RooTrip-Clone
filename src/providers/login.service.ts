import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginUserDto } from "../models/dtos/user/login-user-dto";
import { ServiceResponseForm } from "src/types";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import typia from "typia";
import { NOT_CORRECT_PASSWORD, NOT_EXISTED_EMAIL } from "src/errors/auth-error";
import { encrypt } from "src/utils/crypto";
@Injectable()
export class LoginService {
  private readonly _kakaoApiKey: string;
  private readonly _kakaoRedirectUri: string;
  private readonly _naverClientKey: string;
  private readonly _naverSecretKey: string;
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository,
    private readonly _configService: ConfigService
  ) {
    this._kakaoApiKey = this._configService.getOrThrow("key.kakaoApiKey");
    this._kakaoRedirectUri = this._configService.getOrThrow(
      "key.kakaoRedirectUri"
    );
    this._naverClientKey = this._configService.getOrThrow("key.naverClientKey");
    this._naverSecretKey = this._configService.getOrThrow("key.naverSecretKey");
  }
  async localLogin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this._userRepository.getByEmail(email);
    if (user) {
      if (await user.comparePassword(password!))
        return {
          status: true,
          data: user
        } as ServiceResponseForm;
      else return typia.random<NOT_CORRECT_PASSWORD>();
    } else return typia.random<NOT_EXISTED_EMAIL>();
  }
  async kakaoLogin(code: string) {
    const accessToken = await axios
      .post(
        "https://kauth.kakao.com/oauth/token",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params: {
            grant_type: "authorization_code",
            client_id: this._kakaoApiKey,
            code,
            redirect_uri: this._kakaoRedirectUri
          }
        }
      )
      .then((res) => res.data.access_token)
      .catch(() => null);
    const userInfo = await axios
      .post(
        "https://kapi.kakao.com/v2/user/me",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset",
            Authorization: "Bearer " + accessToken
          }
        }
      )
      .then((res) => res.data)
      .catch(() => null);
    if (userInfo)
      return {
        id: userInfo.id,
        name: userInfo.properties.nickname
      };
  }
  public async naverLogin(code: string) {
    const naverTokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${this._naverClientKey}&client_secret=${this._naverSecretKey}&code=${code}&state=state`;
    const accessToken = await axios
      .post(naverTokenUrl, {}, {})
      .then((res) => res.data.access_token)
      .catch(() => null);
    const userInfo = await axios
      .get("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => res.data.response)
      .catch(() => null);
    const id = encrypt(userInfo.id);
    return {
      id,
      name: userInfo.name,
      gender: userInfo.gender,
      email: "n_" + userInfo.email
    };
  }
}
