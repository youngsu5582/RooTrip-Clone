import { Post } from "../tables/post.entity";

export type ArticleType = Pick<Post, "title" | "content">;
