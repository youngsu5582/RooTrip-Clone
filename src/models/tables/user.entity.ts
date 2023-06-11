import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { hashSync, compareSync } from "bcrypt";
import { defaultColumn } from "../common/default-column";
import { Post } from "./post.entity";
type GenderType = "m" | "w";
@Entity({ name: "user" })
export class User extends defaultColumn {
  /**
   * 사용자의 Email 주소
   * @format email
   */
  @Column({ length: 100, nullable: true })
  email!: string;

  @Column()
  name!: string;

  /**
   * 사용자의 닉네임
   * @minLength 2
   * @maxLength 20
   * @pattern ^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,8}$
   */
  @Column({ nullable: true, type: String })
  nickname?: string | null;

  /**
   * 사용자의 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()/])[A-Za-z\d`~!@#$%^&*()/]{8,16}$
   */
  @Column({ nullable: true, type: String })
  password?: string | null;

  /**
   * 사용자의 성별
   */
  @Column({ nullable: true, type: String })
  gender?: GenderType | null;

  @Column({ nullable: true, type: String, select: false })
  refreshToken?: string | null;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  async comparePassword(unencryptedPassword: string) {
    if (this.password) return compareSync(unencryptedPassword, this.password);
  }
}
