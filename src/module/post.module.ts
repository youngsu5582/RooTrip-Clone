import { Module } from "@nestjs/common";
import { PostRepository } from "src/models/repositories/post.repository";
import { PostController } from "src/controllers/post.controller";
import { PostService } from "src/providers/post.service";
import { DistrictRepository } from "src/models/repositories/district.repository";
import { PhotoRepository } from "src/models/repositories/photo.repository";
import { PhotoService } from "src/providers/photo.service";
import { GeoService } from "src/providers/geo.service";
import { CommentRepository } from "src/models/repositories/comment.repository";
import { RedisCacheService } from "src/database/redis/redis.service";
import { CustomTypeOrmModule } from "../database/typeorm/custom-typeorm.module";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      PostRepository,
      DistrictRepository,
      PhotoRepository,
      CommentRepository
    ])
  ],
  controllers: [PostController],
  providers: [PostService, PhotoService, GeoService, RedisCacheService],
  exports: []
})
export class PostModule {}
