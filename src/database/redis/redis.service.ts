import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisCacheService {
  private readonly client: Redis;
  private readonly storage = "todayPosts";
  constructor(private readonly _configService: ConfigService) {
    this.client = new Redis({
      host: this._configService.get("database.redis.host"),
      port: this._configService.get("database.redis.port")
    });
  }

  async addBlacklist(accessToken: string, expiresIn: number) {
    const key = `blacklist : ${accessToken}`;
    return await this.client.setex(key, expiresIn, 1);
  }
  async checkBlacklist(accessToken: string) {
    const key = `blacklist : ${accessToken}`;
    return Boolean(await this.client.get(key));
  }
  async addVerify(email: string, verifyNumber: string) {
    const key = `verify : ${email}`;
    return await this.client.setex(key, 180, verifyNumber);
  }
  async checkVerify(email: string) {
    const key = `verify : ${email}`;
    return await this.client.get(key);
  }
  async increasePostViews(postId: string, userId: string) {
    const key = `postViews:${postId}`;
    await this.client.pfadd(key, userId);
    return await this.client.sadd(this.storage, postId);
  }
  async todayPostViews(postId: string) {
    const key = `postViews:${postId}`;
    return await this.client.pfcount(key);
  }
  async deletePostViews(postId: string) {
    const key = `postViews:${postId}`;
    this.client.del(key);
    this.client.srem(this.storage, postId);
    return;
  }
  async getTodayPostviews(postId: string) {
    return await this.client.pfcount(postId);
  }
}
