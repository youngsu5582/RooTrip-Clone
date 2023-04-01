import { Module } from '@nestjs/common';
import { CacheModule } from "@nestjs/common"; 
import * as redisStore from 'cache-manager-redis-store';
import env from '../../loaders/env';
import { RedisCacheService } from './redis.service';
const redis = env.database.redis;
const cacheModule = CacheModule.register({
    useFactory : async()=>({
        store : redisStore,
        host :redis.host,
        port : redis.port,
    })
})
@Module({
    imports :[cacheModule],
    providers:[RedisCacheService],
    exports:[RedisCacheService],
})
export class RedisCacheModule{}
