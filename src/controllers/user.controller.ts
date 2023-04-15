import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { CreateUserDto } from "src/models/dtos/create-user-dto";
import { UserService } from "../providers/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  /**
   * @summary 회원 가입 기능
   * 이메일 과 휴대폰 번호가 중복되지 않는 새로운 유저를 만든다.
   *
   *
   * @tag users
   * @param createUserDto 유저 생성하기 위한 Dto
   * @returns
   */
  @TypedRoute.Post("register")
  public async register(@TypedBody() createUserDto: CreateUserDto) {
    const result = this._userService.create(createUserDto);
    return result;
  }
}
