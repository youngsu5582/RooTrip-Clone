export interface LoginUserDto {
  /**
   * 사용자의 Email 주소
   * @format email
   */
  email: string;

  /**
   * 사용자의 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()/])[A-Za-z\d`~!@#$%^&*()/]{8,16}$
   */
  password: string;
}
