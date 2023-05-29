import { Coordinate } from "src/types";

export function parsingCoordinate(coordinate: Coordinate) {
  return `POINT(${coordinate.longitude} ${coordinate.latitude})`;
}
