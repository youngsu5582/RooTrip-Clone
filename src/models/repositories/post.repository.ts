import { Repository } from "typeorm";
import { CustomRepository } from "src/config/typeorm/custom-typeorm.decorator";
import { Post } from "../tables/post.entity";

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {}
