import { ERROR } from ".";

export interface DB_CONNECT_FAILED extends ERROR {
  status: false;
  message: "디비 연결 오류입니다.";
}
