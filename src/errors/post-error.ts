import { ERROR } from ".";

export interface POST_CREATE_FAILED extends ERROR {
  status: false;
  message: "게시글 생성에 실패했습니다.";
}
