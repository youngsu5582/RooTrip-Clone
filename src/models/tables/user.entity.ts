import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import { hashSync, compareSync } from "bcrypt";
import { defaultColumn } from "../common/default-column";
import { Post } from "./post.entity";
import Profile from "./profile.entity";
@Entity({ name: "user" })
export class User extends defaultColumn {
  /**
   * 사용자의 Email 주소
   * @format email
   */
  @Column({ length: 100, nullable: true })
  email!: string;

  /**
   * 사용자의 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d`-~!@#$%^&*()/]{8,16}$
   */
  @Column({ nullable: true, type: String })
  password?: string | null;

  /**
   * 토큰 재발급을 위한 리프레시 토큰
   */
  @Column({ nullable: true, type: String, select: false })
  refreshToken?: string | null;

  /**
   * 조인 위한 프로필 Entity
   */
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: "profile_id" })
  profile?: Profile;

  /**
   * 프로필 Entity Id
   */
  @Column({ name: "profile_id", nullable: true })
  profileId!: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }

  /**
   * 사용자가 작성한 게시글들
   */
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  async comparePassword(unencryptedPassword: string) {
    if (this.password) return compareSync(unencryptedPassword, this.password);
  }
}
