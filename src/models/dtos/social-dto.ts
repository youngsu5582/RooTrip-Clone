import { socialType } from "src/types";

export interface SocialDto {
  /**
   * 로그인 유형 제공자
   * @description 구현하는 소셜 로그인에 따라 제공 (naver,kakao,google)
   */
  provider: socialType;

  /**
   * 인가 받은 코드
   * @description 소셜에서 받은 코드
   */
  code: string;
}
