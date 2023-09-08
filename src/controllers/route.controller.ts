import { Controller, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

@Controller("/route")
@UseGuards(AccessTokenGuard)
export class RouteController {
  //   constructor(
  //     private readonly _routeService: RouteService,
  //     private readonly _photoService: PhotoService,
  //     private readonly _postService: PostService
  //   ) {}
  /**
   * 2023.07.15 Route 변경 여부에 따른 주석 처리
   *
   */
  //   @TypedRoute.Post()
  //   public async recommendRoute(
  //     @Body() routeDto: RouteDto
  //   ): Promise<TryCatch<RouteType.routeResponse[], ROUTE_FOUND_FAILED>> {
  //     const result = await this._routeService.getPost(routeDto.cities);
  //     if (isErrorCheck(result)) return result;
  //     const refinePosts = await Promise.all(
  //       result.map(async (post) => {
  //         const id = post.id;
  //         const thumbnailImage = await this._photoService.getThumbnailByPostId(
  //           id
  //         );
  //         const commentCount = await this._postService.getCommentCountByPostId(
  //           id
  //         );
  //         return { post, ...thumbnailImage, commentCount };
  //       })
  //     );
  //     return createResponseForm(refinePosts);
  //   }
}
