import { CustomRepository } from "../../database/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";
import Comment from "../tables/comment.entity";

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
