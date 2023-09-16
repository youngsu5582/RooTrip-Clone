import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import {
  ADDRESS_MATCH_FAILED,
  GET_SINGED_FAILED
} from "src/errors/photo-error";
import {
  createErrorForm,
  createResponseForm
} from "src/interceptors/transform.interceptor";
import { GeoService } from "src/providers/geo.service";

import { Coordinate, TryCatch } from "src/types";
import { parsingCoordinate } from "src/utils/geoText";
import { S3Provider } from "../database/s3/s3.provider";
import { isErrorCheck } from "../errors";
import { PhotoResponse } from "../responses/photo-response";
@Controller("photo")
export class PhotoController {
  constructor(
    private readonly _geoService: GeoService,
    private readonly _S3Provider: S3Provider
  ) {}

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
  ): Promise<TryCatch<PhotoResponse.reverse, ADDRESS_MATCH_FAILED>> {
    const result = await this._geoService.getAddress(
      parsingCoordinate(coordinate)
    );
    return createResponseForm({ address: result });
  }
  /**
   * @summary SignedUrl 반환
   *
   * @param fileNames 이미지 파일 명
   * @returns
   */
  @TypedRoute.Post("signed")
  async getSigned(
    @TypedBody() fileNames: string[]
  ): Promise<TryCatch<string[], GET_SINGED_FAILED>> {
    const result = await this._S3Provider.signedUrl(fileNames);
    if (isErrorCheck(result)) return createErrorForm(result);
    return createResponseForm(result);
  }
}
