import { ERROR } from ".";

export interface SOCIAL_REGISTER_FAILED extends ERROR {
  status: false;
  data: "소셜 회원가입에 실패했습니다.";
}
