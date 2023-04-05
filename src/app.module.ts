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
@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: [`config/.env.${process.env.NODE_ENV || 'development'}`],
      load:[appConfig,typeormConfig],
      
      validationSchema:Joi.object({
        ...typeormSchema,
        ...appSchema,
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
