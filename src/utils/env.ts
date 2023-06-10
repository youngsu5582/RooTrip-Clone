/**
 * @summary production 검증 함수
 * @description process.env.NODE_ENV 를 확인하여 , 서버의 배포 상태가 뭔지 확인한다.
 * @returns
 */
export function isDevelopment(): boolean {
  const env = process.env.NODE_ENV;
  return env === "development";
}
