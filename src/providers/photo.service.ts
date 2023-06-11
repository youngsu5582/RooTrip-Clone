import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePhotoDto } from "src/models/dtos/create-photo-dto";
import { PhotoRepository } from "src/models/repositories/photo.repository";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly _photoRepository: PhotoRepository
  ) {}
  public async createPhotos(createPhotoDtos: CreatePhotoDto[], postId: string) {
    try {
      return await Promise.all(
        createPhotoDtos.map(
          async (createPhotoDto) =>
            await this._photoRepository.createPhoto(createPhotoDto, postId)
        )
      );
    } catch {
      throw Error;
    }
  }
  public async getPhotosByPostId(postId: string) {
    return await this._photoRepository.find({ where: { postId } });
  }
  public async getThumbnailByPostId(postId: string) {
    const result = (await this._photoRepository.findOne({
      where: { postId },
      select: ["id", "coordinate", "imageUrl"]
    })) as any;
    return result;
  }
}
