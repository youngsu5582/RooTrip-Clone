import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

// @Injectable()
// export class TypeOrmProvider implements TypeOrmOptionsFactory {
//   constructor(private configService: ConfigService) {}

//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       type: "mysql",
//       host: this.configService.get("database.typeorm.host"),
//       port: this.configService.get<number>("database.typeorm.port"),
//       username: this.configService.get("database.typeorm.username"),
//       password: this.configService.get("database.typeorm.password"),
//       database: this.configService.get("database.typeorm.database"),
//       entities: [__dirname + "/../../models/tables/*.entity{.ts,.js}"],
//       logging: "all",
//       synchronize: true
//     };
//   }
// }


export const TypeOrmMoudleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const option:TypeOrmModuleOptions ={
      type: "mysql",
      host: configService.get("database.typeorm.host"),
      port: configService.get<number>("database.typeorm.port"),
      username: configService.get("database.typeorm.username"),
      password: configService.get("database.typeorm.password"),
      database: configService.get("database.typeorm.database"),
      entities: [__dirname + "/../../models/tables/*.entity{.ts,.js}"],
      //logging: "all",
      //synchronize: true
    }
    return option;
  }
}