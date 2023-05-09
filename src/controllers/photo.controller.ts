import { TypedQuery, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { isErrorCheck } from "src/errors";
import { ADDRESS_MATCH_FAILED } from "src/errors/photo-error";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import { GeoService } from "src/providers/geo.service";

import { Coordinate, PhotoType, TryCatch } from "src/types";

@Controller("photo")
export class PhotoController {
  constructor(private readonly _geoService: GeoService) {}

  /**
   * @summary 좌표 위경도
   * @description latitude 와 longitude 를 받아서 행정동 주소를 반환한다.
   * @tag photos
   * @param coordinate 
   * @returns 
   */
  @TypedRoute.Get("reverse")
  public async reverseAddress(
    @TypedQuery() coordinate: Coordinate
  ): Promise<TryCatch<PhotoType.reverseResponse, ADDRESS_MATCH_FAILED>> {
    const result = await this._geoService.getAddress(coordinate);
    if (isErrorCheck(result)) return result;
    return createResponseForm(result);
  }
}
