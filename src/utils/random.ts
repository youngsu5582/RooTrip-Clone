/**
 * @summary 임의 숫자 함수
 * @description 임의 숫자를 받은후 , 6자리가 되지 않을시 5로 채운다.
 *
 * @returns number
 */
export function randomNumber() {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "5");
}
