import { ArticleType } from "../types/articlce-type";
import { photoType } from "../types/photo-type";

export class CreatePostDto {
  public article: ArticleType;

  public newPhotos: photoType[];

  public routes: number[];
}
