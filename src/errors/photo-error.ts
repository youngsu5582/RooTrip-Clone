import { ERROR } from "./index";

export interface ADDRESS_MATCH_FAILED extends ERROR {
  status: false;
  message: "도로명을 받아오는 것에 실패했습니다.";
}
