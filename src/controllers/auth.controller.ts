import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";
import { Controller, HttpCode } from "@nestjs/common";
import { CreateUserDto } from "src/models/dtos/create-user-dto";
import { AuthService } from "../providers/auth.service";
import { CheckDto } from "src/types";

@Controller("auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  /**
   * @summary 회원 가입 기능
   * 이메일이 중복되지 않는 새로운 유저를 만든다.
   *
   *
   * @tag users
   * @param createUserDto 유저 생성하기 위한 Dto
   * @returns
   */
  @TypedRoute.Post("register")
  @HttpCode(201)
  public async register(@TypedBody() createUserDto: CreateUserDto) {
    const result = this._authService.create(createUserDto);
    return result;
  }

  /**
   * @summary 이메일 , 닉네임 중복확인 기능
   * type (email,nickanme) 과 data 를 받아서 중복확인을 합니다.
   * 
   * @tag users
   * @param type
   * @param data
   * @returns
   * 
   */
  @TypedRoute.Get("check")
  @HttpCode(200)
  public async check(@TypedQuery()checkDto :CheckDto){
    const {data,type} = checkDto;
    if(type==='email') return await this._authService.checkDuplicateEmail(data);
    else if (type==='nickname')return await this._authService.checkDuplicateNickname(data);
    else return false;
  }
}
