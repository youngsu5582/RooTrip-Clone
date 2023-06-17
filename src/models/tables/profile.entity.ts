import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { defaultColumn } from "../common/default-column";
import { GenderType } from "src/types";

@Entity({ name: "profile" })
export default class Profile extends defaultColumn {
  /**
   * 조인 위한 사용자 Entity
   */
  @OneToOne(() => User, (user) => user.profile, {
    cascade: true,
    onDelete: "CASCADE"
    })
  @JoinColumn({ name: "user_id" })
  user!: User;

  /**
   * 사용자 Entity Id
   */
  @Column({ name: "user_id" })
  userId!: string;


  /**
   * 프로필 이미지 경로 (aws s3)
   */
  @Column({ nullable: true, type: String, default: "" })
  profileImage?: string;

  /**
   * 자기 소개 위한 한줄 설명란
   */
  @Column({ nullable: true, type: String, default: "" })
  tagLine?: string;

  /**
   * 사용자 이름
   */
  @Column()
  name!: string;

  /**
   * 사용자의 닉네임
   * @minLength 2
   * @maxLength 20
   * @pattern ^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,8}$
   */
  @Column({ nullable: true, type: String })
  nickname?: string;

  /**
   * 사용자의 성별
   */
  @Column({ nullable: true, type: String })
  gender?: GenderType;
}
