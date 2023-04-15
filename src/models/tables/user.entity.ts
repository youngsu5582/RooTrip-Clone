import { Entity, Column, BeforeInsert } from "typeorm";
import { hashSync, compareSync } from "bcrypt";
import { defaultColumn } from "../common/default-column";
type GenderType = "m" | "w";
@Entity({ name: "user" })
export class User extends defaultColumn {
  @Column({ length: 100, nullable: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: String })
  nickname: string | null;

  @Column({ nullable: true, type: String })
  password: string | null;

  @Column({})
  phoneNumber: string;

  @Column({ nullable: true, type: String })
  gender: GenderType | null;

  @Column({ nullable: true, type: String })
  refreshToken: string | null;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  async comparePassword(unencryptedPassword: string) {
    if (this.password) return compareSync(unencryptedPassword, this.password);
  }
}
