import { Module } from "@nestjs/common";
import { RedisCacheModule } from "./redis/redis.module";
import { S3Module } from "./s3/s3.module";

@Module({
  imports: [RedisCacheModule, S3Module],
  exports: [RedisCacheModule, S3Module]
})
export class DatabaseModule {}
