import { Module } from "@nestjs/common";
import { TypeOrmProvider } from "./typeorm/typeorm.module";
import { RedisCacheService } from "./redis/redis.service";

@Module({
  exports: [TypeOrmProvider, RedisCacheService],
})
export class DatabaseModule {}
