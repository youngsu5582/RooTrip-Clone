export interface UserDto {
  /**
   * 사용자 이름
   * @minLength 2
   * @maxLength 10
   * @pattern ^[가-힣]{2,}$
   */
  name: string;
}
