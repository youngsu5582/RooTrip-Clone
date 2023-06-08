import { ERROR } from ".";

export interface ROUTE_FOUND_FAILED extends ERROR {
  status: false;
  message: "경로 탐색에 실패했습니다.";
}
