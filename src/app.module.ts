import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, appSchema } from './app.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmProvider } from './database/typeorm/typeorm.module';
import { typeormConfig } from './database/typeorm/typeorm.validator';
import { typeormSchema } from './database/typeorm/typeorm.validator';
import * as Joi from 'joi';
import { redisConfig, redisSchema } from './database/redis/redis.validator';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: [`config/.env.${process.env.NODE_ENV || 'development'}`],
      load:[appConfig,typeormConfig,redisConfig],
      
      validationSchema:Joi.object({
        ...typeormSchema,
        ...appSchema,
        ...redisSchema,
      }),
      isGlobal: true,
      cache:true,
    }),
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmProvider
    }),
  ],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {}
