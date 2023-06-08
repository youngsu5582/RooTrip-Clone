import Photo from "../tables/photo.entity";

export type CreatePhotoDto = Pick<
  Photo,
  "city" | "first" | "second" | "coordinate" | "imageUrl"
>;
