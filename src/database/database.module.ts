import { Module } from "@nestjs/common";
import { RedisCacheService } from "./redis/redis.service";

@Module({
  exports: [RedisCacheService]
})
export class DatabaseModule {}
  