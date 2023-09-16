import { Repository } from "typeorm";
import { CustomRepository } from "../../database/typeorm/custom-typeorm.decorator";
import Post from "../tables/post.entity";

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
  public async getPostViewsByPostId(postId: string) {
    return await this.findOne({
      where: { id: postId },
      select: ["views"]
    }).then((post) => post!.views);
  }
}
