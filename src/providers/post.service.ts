import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { POST_DELETE_FAILED } from "src/errors/post-error";
import { CreatePostDto } from "src/models/dtos/create-post-dto";
import { UpdatePostDto } from "src/models/dtos/update-post-dto";
import { PostRepository } from "src/models/repositories/post.repository";
import { Post } from "src/models/tables/post.entity";
import typia from "typia";

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
  public async update(postId: string, updatepostDto: UpdatePostDto) {
    return await this._postRepository.update(postId, updatepostDto);
  }
  public async checkUser(userId: string, postId: string) {
    return Boolean(
      await this._postRepository.findOne({ where: { userId, id: postId } })
    );
  }
  public async delete(userId: string, postId: string) {
    try {
      return await this._postRepository.delete(postId);
    } catch {
      return typia.random<POST_DELETE_FAILED>();
    }
  }
}
