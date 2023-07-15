import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import Post from "./post.entity";
import { defaultColumn } from "../common/default-column";

@Entity({ name: "photo" })
export default class Photo extends defaultColumn {
  /**
   * 이미지의 경로 (s3)
   * @pattern ^(?:https?):\/\/[\S]+$
   */
  @Column({ name: "image_url" })
  imageUrl!: string;

  /**
   * 게시글의 아이디
   *
   */
  @Column({ name: "post_id" , select:false })
  postId!: string;

  /**
   * TypeOrm 에서 사용하기 위한 post_id Mapping Object(Post)
   */
  @ManyToOne(() => Post, (post) => post, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "post_id", referencedColumnName: "id" })
  post!: Post;

  /**
   * GeoJSON Point (좌표계)
   */
  @Index({ spatial: true })
  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
    select: false
  })
  coordinate!: string;

  /**
   * 도 & 시를 표시 (경상북도 , 대구 광역시)
   */
  @Column()
  city!: string;

  /**
   * 구 & 군을 표시 (강동구 , 양양군)
   */
  @Column()
  first!: string;

  /**
   * 동 & 면 & 가 를 표시 (둔촌동 , 서면 , 종로1가)
   */
  @Column({ nullable: true })
  second?: string;

  @Column({ type: "smallint", select: false })
  photo_order!: number;
}
