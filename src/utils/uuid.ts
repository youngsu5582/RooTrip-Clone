import { v4 } from "uuid";

/**
 * @summary uuid 생성 함수
 * @description 임의의 잘 중복되지 않는 문자열을 필요할때 사용한다.
 *
 * @returns UUID
 */
export async function uuid() {
  return v4();
}
