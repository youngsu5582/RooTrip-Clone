import { RegionType } from "src/types";
import { PostRepository } from "../models/repositories/post.repository";
import { PhotoRepository } from "src/models/repositories/photo.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import typia from "typia";
import { ROUTE_FOUND_FAILED } from "src/errors/route-error";
//import { RegionType } from "../dtos/RouteDto";

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly _postRepository: PostRepository,
    @InjectRepository(PhotoRepository)
    private readonly _photoRepository: PhotoRepository
  ) {}
  public async getPost(cities: Array<RegionType>) {
    try {
      let matched = (
        await this._photoRepository
          .createQueryBuilder("photo")
          .select("distinct post_id")
          .where({ city: cities[0] })
          .getRawMany()
      ).map((packet) => packet.post_id);
      for (let i = 1; i < cities.length; i++) {
        matched = (
          await this._photoRepository
            .createQueryBuilder("photo")
            .select("distinct post_id")
            .where({ city: cities[i] })
            .andWhere("post_id IN (:...matched)", { matched })
            .getRawMany()
        ).map((packet) => packet.post_id);
      }
      const posts = await this._postRepository
        .createQueryBuilder("post")
        .where("id In(:...matched)", { matched })
        .andWhere("visibility = 'public'")
        .getMany();
      return posts;
    } catch {
      return typia.random<ROUTE_FOUND_FAILED>();
    }
  }
}
