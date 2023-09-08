import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { POST_DELETE_FAILED } from "src/errors/post-error";
import { CreatePostDto } from "src/models/dtos/create-post-dto";
import { UpdatePostDto } from "src/models/dtos/update-post-dto";
import { CommentRepository } from "src/models/repositories/comment.repository";
import { PostRepository } from "src/models/repositories/post.repository";
import Post from "src/models/tables/post.entity";
import typia from "typia";
import { RedisCacheService } from "../database/redis/redis.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly _postRepository: PostRepository,
    @InjectRepository(CommentRepository)
    private readonly _commentRepository: CommentRepository,
    private readonly _cacheService: RedisCacheService
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
  public async getCommentCountByPostId(postId: string) {
    return await this._commentRepository.count({ where: { postId } });
  }
  public async getPostById(postId: string) {
    try {
      return (await this._postRepository.findOne({
        where: { id: postId },
        relations: ["photos", "user.profile", "comments"]
      })) as Post;
    } catch (err) {}
  }
  public async getTotalPostViews(postId: string) {
    return (
      (await this._postRepository.getPostViewsByPostId(postId)) +
      (await this._cacheService.getTodayPostviews(postId))
    );
  }
}
