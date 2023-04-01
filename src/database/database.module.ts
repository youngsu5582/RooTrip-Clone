import { Module } from '@nestjs/common';
import  {RedisCacheModule}  from './redis/redis.module';
import {TypeOrmModule} from './typeorm/typeorm.module';
@Module({
  providers: [TypeOrmModule],
  exports:[TypeOrmModule,RedisCacheModule],
  imports: [RedisCacheModule,TypeOrmModule]
})
export class DatabaseModule {}
