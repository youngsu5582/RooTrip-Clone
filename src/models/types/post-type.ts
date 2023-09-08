import Post from "../tables/post.entity";

export type PostType = Pick<
  Post,
  "id" | "title" | "content" | "like" | "routes"
>;
