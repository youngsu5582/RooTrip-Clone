import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { DistrictRepository } from "src/models/repositories/district.repository";
import { GeoService } from "src/providers/geo.service";
import { PhotoController } from "src/controllers/photo.controller";
import { DatabaseModule } from "../database/database.module";
import { S3Provider } from "../database/s3/s3.provider";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([DistrictRepository]),
    DatabaseModule
  ],
  controllers: [PhotoController],
  providers: [GeoService, S3Provider],
  exports: []
})
export class PhotoModule {}
