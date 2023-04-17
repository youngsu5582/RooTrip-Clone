import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { LoginUserDto } from "src/models/dtos/login-user-dto";
import { LoginService } from "src/providers/login.service";

@Controller("auth")
export class LoginController {
  constructor(private readonly _loginService: LoginService) {}

  /**
   * @summary 로그인 기능
   * @description 이메일과 비밀번호를 이용해 로그인 한다.
   * @tag users
   * @param loginUserDto 로그인 하기 위한 Dto
   * @returns
   */
  @TypedRoute.Post("login")
  async localLogin(@TypedBody() loginUserDto: LoginUserDto) {
    const result = await this._loginService.localLogin(loginUserDto);
    return result;
    // if(result.status===false)
    //     return result;
    //const user = result.data;
  }
}
