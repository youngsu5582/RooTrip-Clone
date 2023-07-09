import { ERROR } from "./index";

export interface ADDRESS_MATCH_FAILED extends ERROR {
  status: false;
  message: "도로명을 받아오는 것에 실패했습니다.";
}

export interface GET_SINGED_FAILED extends ERROR {
  status: false;
  message: "S3 경로 생성에 실패했습니다.";
}
