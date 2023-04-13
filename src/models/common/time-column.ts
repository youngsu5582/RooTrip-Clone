import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn
} from "typeorm";
import typia from "typia";

export abstract class CreatedAtColumn extends BaseEntity {
  @CreateDateColumn({ name: "created_at" })
  public readonly createdAt!: typia.Primitive<Date> | Date | string;
  @UpdateDateColumn({ name: "updated_at" })
  public readonly updatedAt!: typia.Primitive<Date> | Date | string;
  @DeleteDateColumn({ name: "deleted_at" })
  public readonly deletedAt?: typia.Primitive<Date> | Date | string;
}
