import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePhotoDto } from "src/models/dtos/create-photo-dto";
import { PhotoRepository } from "src/models/repositories/photo.repository";
import { ViewPostTypeDto } from "../models/dtos/view-post-type-dto";
import { isCityType } from "../interceptors/type-guard.interceptor";

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
          async (createPhotoDto, index) =>
            await this._photoRepository.createPhoto(
              createPhotoDto,
              postId,
              index
            )
        )
      );
    } catch (err) {
      throw err;
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
  public async getPostIdsByType(viewPostTypeDto: ViewPostTypeDto) {
    if (isCityType(viewPostTypeDto))
      return await this._photoRepository.getPostIdsByPolygon(
        viewPostTypeDto.polygon,
        viewPostTypeDto.markerCount
      );
    else return await this._photoRepository.getRandomPostIdsEachCity();
  }
}
