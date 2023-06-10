import { RouteService } from "../providers/route.service";
import { Body, Controller, UseGuards } from "@nestjs/common";
import { createResponseForm } from "src/interceptors/transform.interceptor";
import { TypedRoute } from "@nestia/core";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { RouteDto, RouteType, TryCatch } from "src/types";
import { isErrorCheck } from "src/errors";
import { PhotoService } from "src/providers/photo.service";
import { PostService } from "src/providers/post.service";
import { ROUTE_FOUND_FAILED } from "src/errors/route-error";

@Controller("/route")
@UseGuards(AccessTokenGuard)
export class RouteController {
  constructor(
    private readonly _routeService: RouteService,
    private readonly _photoService: PhotoService,
    private readonly _postService: PostService
  ) {}
  @TypedRoute.Post()
  public async recommendRoute(
    @Body() routeDto: RouteDto
  ): Promise<TryCatch<RouteType.routeResponse[], ROUTE_FOUND_FAILED>> {
    const result = await this._routeService.getPost(routeDto.cities);
    if (isErrorCheck(result)) return result;
    const refinePosts = await Promise.all(
      result.map(async (post) => {
        const id = post.id;
        const thumbnailImage = await this._photoService.getThumbnailByPostId(
          id
        );
        const commentCount = await this._postService.getCommentCountByPostId(
          id
        );
        return { post, ...thumbnailImage, commentCount };
      })
    );
    return createResponseForm(refinePosts);
  }
}
