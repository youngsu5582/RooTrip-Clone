import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmMoudleOptions } from "./database/typeorm";
import * as Joi from "joi";
import { typeormConfig, appConfig, redisConfig, keyConfig } from "./config";
import {
  typeormValidator,
  appValidator,
  redisValidator,
  keyValidator
} from "./validator";
import { LoggerMiddleware } from "./middleware/logging.middleware";
import { APP_FILTER, DiscoveryService } from "@nestjs/core";
import { AllExceptionsFilter } from "./middleware/error.middleware";
import { AuthModule } from "./module/auth.module";
import { LoginModule } from "./module/login.module";
import { JwtModule } from "@nestjs/jwt";
import { LoadersModule } from "./loaders/loaders.module";
import { EmailModule } from "./module/email.module";
import { PhotoModule } from "./module/photo.module";
import { PostModule } from "./module/post.module";
import { RouteModule } from "./module/route.module";
import { AccessTokenGuard } from "./guards/accessToken.guard";
import { RedisCacheModule } from "./database/redis/redis.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmMoudleOptions),
    ConfigModule.forRoot({
      envFilePath: [`config/.env.${process.env.NODE_ENV || "development"}`],
      load: [typeormConfig, appConfig, redisConfig, keyConfig],
      validationSchema: Joi.object({
        ...typeormValidator,
        ...appValidator,
        ...redisValidator,
        ...keyValidator
      }),

      isGlobal: true,
      cache: true
    }),
    JwtModule.register({ global: true }),
    LoadersModule,
    AuthModule,
    LoginModule,
    EmailModule,
    PhotoModule,
    PostModule,
    RouteModule,
    RedisCacheModule
  ],
  controllers: [],
  providers: [
    ConfigService,
    DiscoveryService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    AccessTokenGuard
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
