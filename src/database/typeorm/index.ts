import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const TypeOrmMoudleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const option: TypeOrmModuleOptions = {
      type: "mysql",
      host: configService.get("database.typeorm.host"),
      port: configService.get<number>("database.typeorm.port"),
      username: configService.get("database.typeorm.username"),
      password: configService.get("database.typeorm.password"),
      database: configService.get("database.typeorm.database"),
      entities: [__dirname + "/../../models/tables/*.entity{.ts,.js}"],
      //logging: "all",
      //   configService.get("app.nodeEnv") === "development" ? "all" : null,
      synchronize: true,
      legacySpatialSupport: false
    };
    return option;
  }
};
