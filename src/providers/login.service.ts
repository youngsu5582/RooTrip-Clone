import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../models/repositories/user.repository";
import { LoginUserDto } from "../models/dtos/login-user-dto";
import { ServiceResponseForm } from "src/types";
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _userRepository: UsersRepository
  ) {}
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
}
