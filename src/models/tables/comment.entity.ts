import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { defaultColumn } from "../common/default-column";

@Entity({ name: "comment" })
export default class Comment extends defaultColumn {
  @Column({ name: "post_id", select: false })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Column({ type: "text", charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  comment: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User, (user) => user, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "int", default: 0 })
  like: number;
}
