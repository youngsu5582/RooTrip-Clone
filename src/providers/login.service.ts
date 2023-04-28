import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginUserDto } from "../models/dtos/login-user-dto";
import { ServiceResponseForm } from "src/types";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class LoginService {
  private readonly _kakaoApiKey;
  private readonly _kakaoRedirectUri;
  private readonly _naverClientKey;
  private readonly _naverSecretKey;
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository,
    private readonly _configService: ConfigService
  ) {
    this._kakaoApiKey = this._configService.get("key.kakaoApiKey");
    this._kakaoRedirectUri = this._configService.get("key.kakaoRedirectUri");
    this._naverClientKey = this._configService.get("key.naverClientKey");
    this._naverSecretKey = this._configService.get("key.naverSecretKey");
  }
  async localLogin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this._userRepository.getByEmail(email);
    let serviceResponse: ServiceResponseForm;
    if (user) {
      if (await user.comparePassword(password))
        serviceResponse = {
          status: true,
          data: user
        };
      else
        serviceResponse = {
          status: false,
          message: "비밀번호가 일치하지 않습니다."
        };
    } else {
      serviceResponse = {
        status: false,
        message: "해당 이메일이 없습니다."
      };
    }
    return serviceResponse;
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
    console.log(this._kakaoApiKey);
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
}
