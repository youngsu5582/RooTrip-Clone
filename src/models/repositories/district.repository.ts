import { Repository } from "typeorm";
import { District } from "../tables/district.entity";
import { CustomRepository } from "../../database/typeorm/custom-typeorm.decorator";

@CustomRepository(District)
export class DistrictRepository extends Repository<District> {
  async getAddressByPoint(coordinate: string) {
    return await this.query(
      `
            SELECT city,first,second,third
            FROM district
            ORDER BY ST_Distance_Sphere(coordinate, ST_GeomFromText('${coordinate}'))
            LIMIT 1;
            `
    ).then((data) => {
      //const coordinate = data[0].coordinate;
      return {
        ...data[0]
        //coordinate: `POINT(${coordinate.y} ${coordinate.x})`
      };
    });
  }
}
