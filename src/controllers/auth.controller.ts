import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";
import { Controller, HttpCode, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/models/dtos/create-user-dto";
import { AuthService } from "../providers/auth.service";
import { CheckDto } from "src/types";
import { Request, Response } from "express";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { JwtUtil } from "src/providers/jwt.service";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

@Controller("auth")
export class AuthController {
  private readonly minute = 60;
  constructor(
    private readonly _authService: AuthService,
    private readonly _jwtUtil: JwtUtil
  ) {}
  /**
   * @summary 회원 가입 기능
   * @description 이메일이 중복되지 않는 새로운 유저를 만든다.
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
   * @description type (email,nickanme) 과 data 를 받아서 중복확인을 합니다.
   *
   * @tag users
   * @param type
   * @param data
   * @returns
   *
   */
  @TypedRoute.Get("check")
  @HttpCode(200)
  public async check(@TypedQuery() checkDto: CheckDto) {
    const { data, type } = checkDto;
    if (type === "email")
      return await this._authService.checkDuplicateEmail(data);
    else if (type === "nickname")
      return await this._authService.checkDuplicateNickname(data);
    else return false;
  }

  @TypedRoute.Post("token/reissue")
  @HttpCode(201)
  @UseGuards(RefreshTokenGuard)
  public async refresh(@Req() req: Request, @Res() res: Response) {
    const userId = req.data.jwtPayload.userId;
    const refreshToken = req.body.token;
    const user = await this._authService.validateUserToken(
      userId,
      refreshToken
    );
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "유저 정보와 RefreshToken이 일치하지 않습니다."
      });
    }
    const accessToken = this._jwtUtil.generateAccessToken(user);
    return {
      expire: 15 * this.minute,
      accessToken
    };
  }

  /**
   * @summary 로그아웃 기능
   * @description Header 에 있는 Token 을 활용하여 로그아웃을 합니다.
   *
   * @tag users
   * @param res
   * @returns
   *
   */
  @UseGuards(AccessTokenGuard)
  @TypedRoute.Post("logout")
  @HttpCode(201)
  public async logout(@Req() req: Request) {
    const jwtPayload = req.data.jwtPayload;
    const result = await this._authService.logout(jwtPayload);

    if (result) return true;
    else return false;
  }
}
