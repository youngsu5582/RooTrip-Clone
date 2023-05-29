import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "src/models/dtos/create-post-dto";
import { PostRepository } from "src/models/repositories/post.repository";
import { Post } from "src/models/tables/post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly _postRepository: PostRepository
  ) {}
  public async create(createPostDto: CreatePostDto, userId: string) {
    return await this._postRepository.save(
      Post.create({
        ...createPostDto.article,
        routes: createPostDto.routes,
        userId
      })
    );
  }
}
