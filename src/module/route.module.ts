import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { PostRepository } from "src/models/repositories/post.repository";
import { PostService } from "src/providers/post.service";
import { DistrictRepository } from "src/models/repositories/district.repository";
import { PhotoRepository } from "src/models/repositories/photo.repository";
import { PhotoService } from "src/providers/photo.service";
import { RouteController } from "src/controllers/route.controller";
import { RouteService } from "src/providers/route.service";
import { CommentRepository } from "src/models/repositories/comment.repository";
import { RedisCacheService } from "src/database/redis/redis.service";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      PostRepository,
      CommentRepository,
      DistrictRepository,
      PhotoRepository
    ])
  ],
  controllers: [RouteController],
  providers: [RouteService, PhotoService, PostService,RedisCacheService],
  exports: []
})
export class RouteModule {}
