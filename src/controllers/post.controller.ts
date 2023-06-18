import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";
import { Controller, UseGuards } from "@nestjs/common";
import { PostId } from "src/decorator/param/post-id.decorator";
import { UserId } from "src/decorator/param/user-id.decorator";
import { isErrorCheck } from "src/errors";
import {
  POST_CREATE_FAILED,
  POST_DELETE_FAILED,
  POST_NOT_MATCH_USER,
  POST_UPDATE_FAILED
} from "src/errors/post-error";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import { CreatePostDto } from "src/models/dtos/create-post-dto";
import { UpdatePostDto } from "src/models/dtos/update-post-dto";

import { GeoService } from "src/providers/geo.service";
import { PhotoService } from "src/providers/photo.service";
import { PostService } from "src/providers/post.service";
import { PostType, TryCatch } from "src/types";
import { parsingCoordinate } from "src/utils/geoText";
import typia from "typia";
@UseGuards(AccessTokenGuard)
@Controller("post")
export class PostController {
  constructor(
    private readonly _postService: PostService,
    private readonly _geoService: GeoService,
    private readonly _photoService: PhotoService
  ) {}
  /**
   * 게시글 생성
   *
   * CreatePostDto(article,newPhotos,routes) 를 통해 게시글을 생성한다.
   *
   * @tag posts
   * @param createPostDto
   * @param req
   * @returns
   */
  @TypedRoute.Post()
  public async createPost(
    @TypedBody() createPostDto: CreatePostDto,
    @UserId() userId: string
  ): Promise<TryCatch<PostType.createResponse, POST_CREATE_FAILED>> {
    try {
      const createPhotoDto = await Promise.all(
        createPostDto.newPhotos.map(async (photo) => {
          return {
            imageUrl: photo.url,
            ...(await this._geoService.getAddress(
              parsingCoordinate(photo.coordinate)
            ))
          };
        })
      );
      const post = await this._postService.create(createPostDto, userId);
      const photos = await this._photoService.createPhotos(
        createPhotoDto,
        post.id
      );
      
      const data = {
        postId: post.id,
        id: photos[0].id,
        coordinate: photos[0].coordinate,
        imageUrl: photos[0].imageUrl
      };
      return createResponseForm(data);
    } catch {
      return typia.random<POST_CREATE_FAILED>();
    }
  }

  /**
   * @summary 게시글 수정
   * @description UpdatePostDto(article,content) 를 통해 게시글을 수정한다.
   * @tag posts
   * @param postId
   * @param updatePostDto
   * @param req
   * @returns
   */
  @TypedRoute.Patch("/:postId")
  public async updatePost(
    @PostId() postId: string,
    @TypedBody() updatePostDto: UpdatePostDto,
    @UserId() userId: string
  ): Promise<TryCatch<undefined, POST_UPDATE_FAILED | POST_NOT_MATCH_USER>> {
    const isMatched = await this._postService.checkUser(userId, postId); // 게시글 - 사용자 일치한지 확인
    if (isMatched) {
      try {
        await this._postService.update(postId, updatePostDto);
        return createResponseForm(undefined);
      } catch {
        return typia.random<POST_UPDATE_FAILED>();
      }
    } else return typia.random<POST_NOT_MATCH_USER>();
  }

  /**
   * @summary 게시글 삭제
   * @description userId 와 postId를 통해 확인후 게시글을 삭제한다.
   * @tag posts
   * @param postId
   * @param req
   * @returns
   */
  @TypedRoute.Delete("/:postId")
  public async deletePost(
    @TypedParam("postId") postId: string,
    @UserId() userId: string
  ): Promise<TryCatch<undefined, POST_DELETE_FAILED | POST_NOT_MATCH_USER>> {
    const isMatched = await this._postService.checkUser(userId, postId); // 게시글 - 사용자 일치한지 확인
    if (isMatched) {
      const result = await this._postService.delete(userId, postId);
      if (isErrorCheck(result)) return result;
      return createResponseForm(undefined);
    } else return typia.random<POST_NOT_MATCH_USER>();
  }
}
