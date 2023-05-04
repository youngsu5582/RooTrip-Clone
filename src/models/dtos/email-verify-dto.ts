export interface EmailVerifyDto {
  /**
   * 사용자의 Email 주소
   * @format email
   */
  email: string;
  /**
   *
   * 사용자의 인증 번호
   * @minLength 5
   * @maxLength 6
   */
  verifyNumber: string;
}
