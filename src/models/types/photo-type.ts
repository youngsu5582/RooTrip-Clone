import { Coordinate } from "src/types";

export interface photoType {
  id: number;
  feedOrder: number;
  fileName: string;
  url: string;
  dateTime: Date;
  coordinate: Coordinate;
}
