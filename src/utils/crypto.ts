import crypto from "crypto";

/**
 * sha256 해쉬화 함수
 * @description Naver 와 같은 매우 긴 문자열이 Id 일 경우 , 중복되지 않으면서 길이 단축
 * @param id
 * @returns
 */
export function encrypt(id: string) {
  return crypto.createHash("sha256").update(id).digest("hex").slice(0, 36);
}
