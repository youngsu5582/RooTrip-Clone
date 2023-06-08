import { Repository } from "typeorm";
import { CustomRepository } from "src/config/typeorm/custom-typeorm.decorator";
import Photo from "../tables/photo.entity";
import { CreatePhotoDto } from "../dtos/create-photo-dto";
import { uuid } from "src/utils/uuid";

@CustomRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async createPhoto(createPhotoDto: CreatePhotoDto, postId: string) {
    const { city, coordinate, first, second, imageUrl } = createPhotoDto;

    return await this.query(
      `INSERT INTO photo (id, image_url, post_id, coordinate, city, first, second) VALUES ("${await uuid()}", "${imageUrl}", "${postId}", ST_GeomFromText(${coordinate})", 4326),"${city}", "${first}","${second}")`
    );
  }
}
