import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import {Post} from './post.entity';
import { defaultColumn } from "../common/default-column";

@Entity({ name: "photo" })
export default class Photo extends defaultColumn {
  @Column({})
  image_url: string;

  @Column({ name: "post_id" })
  postId: string;

  @ManyToOne(() => Post, (post) => post, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Index({ spatial: true })
  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
    select: false
  })
  coordinate: string;

  @Column()
  city: string;

  @Column()
  first: string;

  @Column({ nullable: true })
  second: string;
}