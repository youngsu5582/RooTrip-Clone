import { ERROR } from ".";

export interface SOCIAL_REGISTER_FAILED extends ERROR {
  status: false;
  message: "소셜 회원가입에 실패했습니다.";
}
export interface TOKEN_NOT_MATCH_USER extends ERROR {
  status: false;
  message: "토큰 정보가 사용자 정보와 일치하지 않습니다.";
}
export interface ALREADY_EXISTED_EMAIL extends ERROR {
  status: false;
  message: "중복된 이메일이 있습니다.";
}
export interface LOCAL_REGISTER_FAILED extends ERROR {
  status: false;
  message: "로컬 회원가입에 실패했습니다.";
}
export interface NOT_CORRECT_PASSWORD extends ERROR {
  status: false;
  message: "비밀번호가 일치하지 않습니다.";
}
export interface NOT_EXISTED_EMAIL extends ERROR {
  status: false;
  message: "해당 이메일이 없습니다.";
}
export interface EMAIL_SEND_FAILED extends ERROR {
  status: false;
  message: "이메일 전송에 실패했습니다.";
}
export interface NOT_CORRECT_NUMBER extends ERROR {
  status: false;
  message: "인증번호와 입력 번호가 일치하지 않습니다.";
}
export interface MODIFY_USER_FAILED extends ERROR {
  status: false;
  message: "사용자 정보 변경에 실패했습니다.";
}
export interface NOT_VALIDATE_CODE extends ERROR {
  status: false;
  message: "부적절한 코드입니다.";
}
