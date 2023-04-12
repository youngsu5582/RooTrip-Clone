import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmProvider } from './database/typeorm/typeorm.module';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig, appConfig, redisConfig } from './config';
import { typeormValidator, appValidator, redisValidator } from './validator';
import { TestModule } from './module/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`config/.env.${process.env.NODE_ENV || 'development'}`],
      load: [typeormConfig, appConfig, redisConfig],
      validationSchema: Joi.object({
        ...typeormValidator,
        ...appValidator,
        ...redisValidator,
      }),
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmProvider,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
