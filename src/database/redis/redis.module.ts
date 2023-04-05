import { Module } from '@nestjs/common';
import { CacheModule } from "@nestjs/common"; 
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis.service';
const cacheModule = CacheModule.register({
    useFactory : async(configService:ConfigService)=>({
        store : redisStore,
        host :configService.get<string>('database.redis.host'),
        port : configService.get<number>('database.redis.port'),
    })
})
@Module({
    imports :[cacheModule],
    providers:[RedisCacheService],
    exports:[RedisCacheService],
})
export class RedisCacheModule{}
