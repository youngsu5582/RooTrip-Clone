import { Coordinate } from "src/types";

/**
 * @summary 좌표계 파싱 함수
 * @descrption latitude 와 longitude 를 Mysql 에서 사용하기 위해 문자열로 변환
 *
 * @param coordinate
 * @returns string
 */
export function parsingCoordinate(coordinate: Coordinate) {
  return `POINT(${coordinate.longitude} ${coordinate.latitude})`;
}
