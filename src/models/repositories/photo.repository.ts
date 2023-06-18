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
}
