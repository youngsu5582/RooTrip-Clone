import { PrimaryGeneratedColumn } from "typeorm";
import { CreatedAtColumn } from "./time-column";
import { ApiProperty } from "@nestjs/swagger";

export abstract class defaultColumn extends CreatedAtColumn {
  @ApiProperty({ description: "id" })
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;
}
