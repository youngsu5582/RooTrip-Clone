import { Module } from "@nestjs/common";
import { CustomTypeOrmModule } from "../config/typeorm/custom-typeorm.module";
import { DistrictRepository } from "src/models/repositories/district.repository";
import { GeoService } from "src/providers/geo.service";
import { PhotoController } from "src/controllers/photo.controller";

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([DistrictRepository])],
  controllers: [PhotoController],
  providers: [GeoService],
  exports: []
})
export class PhotoModule {}
