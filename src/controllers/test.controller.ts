import { TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("test")
export class TestController {
  constructor() {}

  /**
   * @summary 친구 추천 기능
   * 유저가 자신의 친구일 수 있는 사람, 유명인 등을 조회하는 API로, 일종의 친구 추천 기능을 의미한다.
   *
   * @tag users
   * @param name 유저 아이디
   * @returns
   */
  @TypedRoute.Get("user")
  async getHello() {
    return "hihi";
  }
}
