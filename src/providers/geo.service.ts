import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ADDRESS_MATCH_FAILED } from "src/errors/photo-error";
import { DistrictRepository } from "src/models/repositories/district.repository";
import typia from "typia";

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(DistrictRepository)
    private readonly _districtRepository: DistrictRepository
  ) {}

  /**
   * 0509 생각해본결과 굳이 Coordinate Type으로 latitude longitude 구분해서 받을 필요 없이 문자열로 받는게 맞는듯
   *
   * 2023.05.29 수정 완료
   */
  public async getAddress(point: string) {
    try {
      const temp = await this._districtRepository.getAddressByPoint(point);
      return temp;
    } catch {
      throw typia.random<ADDRESS_MATCH_FAILED>();
    }
  }
}
