import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import typia from "typia";
import { GET_SINGED_FAILED } from "../../errors/photo-error";

@Injectable()
export class S3Provider {
  private s3: S3;
  private bucketName: string;
  private bucketUrl: string;
  constructor(private readonly _configService: ConfigService) {
    this.bucketName = this._configService.getOrThrow("database.s3.bucketName");
    this.bucketUrl = this._configService.getOrThrow("database.s3.bucketUrl");

    this.s3 = new S3({
      signatureVersion: "s3v4",
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: this._configService.getOrThrow("database.s3.accessKey"),
        secretAccessKey: this._configService.getOrThrow("database.s3.secretKey")
      }
    });
  }
  public async signedUrl(objectKeys: string[]) {
    try {
      return objectKeys.map((objectKey) =>
        this.s3.getSignedUrl("putObject", {
          ACL: "public-read",
          Bucket: this.bucketName,
          Key: objectKey,
          Expires: 1800,
          ContentType: "image/*"
        })
      );
    } catch {
      return typia.random<GET_SINGED_FAILED>();
    }
  }
}
