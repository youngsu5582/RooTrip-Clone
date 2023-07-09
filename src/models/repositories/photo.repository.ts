import { Repository } from "typeorm";
import { CustomRepository } from "src/config/typeorm/custom-typeorm.decorator";
import Photo from "../tables/photo.entity";
import { CreatePhotoDto } from "../dtos/create-photo-dto";

@CustomRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async createPhoto(
    createPhotoDto: CreatePhotoDto,
    postId: string,
    photo_order: number
  ) {
    return this.create(
      await this.save({ ...createPhotoDto, postId, photo_order })
    );
  }
  async getPostIdsByPolygon(polygon: string, markerCount: number) {
    return await this.query(
      `SELECT distinct post_id
    FROM photo
    WHERE photo_order = 0 and ST_Within(coordinate,ST_GeomFromText('${polygon}', 4326))
    LIMIT ${markerCount};`
    ).then((result) => result.map((row) => row.post_id));
  }
  async getRandomPostIdsEachCity() {
    return await this.query(
      `
    SELECT distinct temp.post_id as id
    FROM (
        SELECT photo.city, post_id, ROW_NUMBER() OVER (PARTITION BY city ORDER BY RAND()) AS row_num
        FROM photo
    ) as temp
    WHERE row_num = 1;`
    ).then((result) => result.map((row) => row.id));
  }
}
