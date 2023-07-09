import { CityType, ViewPostTypeDto } from "../models/dtos/view-post-type-dto";

export function isCityType(dto: ViewPostTypeDto): dto is CityType {
  return dto.viewType === "city";
}
