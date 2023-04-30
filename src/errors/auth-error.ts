import { ERROR } from ".";

export interface SOCIAL_REGISTER_FAILED extends ERROR {
  status: false;
  data: "소셜 회원가입에 실패했습니다.";
}
export interface TOKEN_NOT_MATCH_USER extends ERROR {
  status: false;
  data: "토큰 정보가 사용자 정보와 일치하지 않습니다.";
}
