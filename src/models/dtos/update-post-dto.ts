import Post from "../tables/post.entity";

export type UpdatePostDto = Pick<Post, "title" | "content">;
