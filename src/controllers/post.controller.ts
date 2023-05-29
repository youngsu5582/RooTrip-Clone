import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { POST_CREATE_FAILED } from "src/errors/post-error";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import { CreatePostDto } from "src/models/dtos/create-post-dto";
import { GeoService } from "src/providers/geo.service";
import { PhotoService } from "src/providers/photo.service";
import { PostService } from "src/providers/post.service";
import { TryCatch } from "src/types";
import { parsingCoordinate } from "src/utils/geoText";
import typia from "typia";

@Controller("post")
export class PostController {
  constructor(
    private readonly _postService: PostService,
    private readonly _geoService: GeoService,
    private readonly _photoService: PhotoService
  ) {}
  /**
   * @summary 게시글 생성
   * @description CreatePostDto(article,newPhotos,routes) 를 통해 게시글을 생성한다.
   * @tag posts
   * @param createPostDto
   * @param req
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @TypedRoute.Post("")
  public async createPost(
    @TypedBody() createPostDto: CreatePostDto,
    @Req() req: Request
  ): Promise<TryCatch<undefined, POST_CREATE_FAILED>> {
    const userId = req.data.jwtPayload.userId;
    try {
      const createPhotoDto = await Promise.all(
        createPostDto.newPhotos.map(async (photo) => {
          return {
            image_url: photo.url,
            ...(await this._geoService.getAddress(
              parsingCoordinate(photo.coordinate)
            ))
          };
        })
      );
      const post = await this._postService.create(createPostDto, userId);
      await this._photoService.createPhotos(createPhotoDto, post.id);
      return createResponseForm(undefined);
    } catch {
      return typia.random<POST_CREATE_FAILED>();
    }
  }
}
