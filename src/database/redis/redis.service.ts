import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisCacheService {
  private readonly client: Redis;
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
}
