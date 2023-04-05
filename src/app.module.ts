import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, appSchema } from './app.validator';
@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: [`config/.env.${process.env.NODE_ENV || 'development'}`],
      load:[appConfig],
      validationSchema:appSchema,
      isGlobal: true,
      cache:true,
    }),
  
  ],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {}
