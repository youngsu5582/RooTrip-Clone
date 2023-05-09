import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ADDRESS_MATCH_FAILED } from "src/errors/photo-error";
import { DistrictRepository } from "src/models/repositories/district.repository";
import { Coordinate, PhotoType } from "src/types";
import typia from "typia";

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(DistrictRepository)
    private readonly _districtRepository: DistrictRepository
  ) {}

  public async getAddress(coordinate: Coordinate) {
    const point = `POINT(${coordinate.longitude} ${coordinate.latitude})`;
    try {
      return (await this._districtRepository.getAddressByPoint(
        point
      )) as PhotoType.reverseResponse;
    } catch {
      return typia.random<ADDRESS_MATCH_FAILED>();
    }
  }
}
