import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmMoudleOptions } from "./database/typeorm";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { typeormConfig, appConfig, redisConfig } from "./config";
import { typeormValidator, appValidator, redisValidator } from "./validator";
import { TestModule } from "./module/test.module";
import { LoggerMiddleware } from "./middleware/logging.middleware";
import { LoggerModule } from "./loaders/winston.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./middleware/error.middleware";
import { AuthModule } from "./module/auth.module";
import { LoginModule } from "./module/login.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmMoudleOptions),
    ConfigModule.forRoot({
      envFilePath: [`config/.env.${process.env.NODE_ENV || "development"}`],
      load: [typeormConfig, appConfig, redisConfig],
      validationSchema: Joi.object({
        ...typeormValidator,
        ...appValidator,
        ...redisValidator
      }),
      isGlobal: true,
      cache: true
    }),
    TestModule,
    LoggerModule,
    AuthModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
