export interface CreateUserDto {
  /**
   * 사용자의 Email 주소
   * @format email
   */
  email: string;

  /**
   * 사용자 이름
   * @minLength 2
   * @maxLength 10
   * @pattern ^[가-힣]{2,}$
   */
  name: string;

  /**
   * 사용자의 닉네임
   * @minLength 2
   * @maxLength 20
   * @pattern ^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,8}$
   */
  nickname: string;

  /**
   * 사용자의 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()/])[A-Za-z\d`~!@#$%^&*()/]{8,16}$
   */
  password: string;

  /**
   * 사용자의 성별
   */
  gender: "m" | "w";
}
