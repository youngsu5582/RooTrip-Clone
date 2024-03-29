import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { defaultColumn } from "../common/default-column";
import { User } from "./user.entity";
import Photo from "./photo.entity";
import Comment from "./comment.entity";

@Entity({ name: "post" })
export default class Post extends defaultColumn {
  @Column({ name: "user_id", select: false })
  userId!: string;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ nullable: false })
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "int", default: 0 })
  like!: number;

  @Column({ type: "int", default: 0, select: false })
  views!: number;

  @Column({ type: "simple-array" })
  routes!: number[];

  @OneToMany(() => Photo, (photo) => photo.post)
  photos!: Photo[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinColumn()
  comments?: Comment[];
}
