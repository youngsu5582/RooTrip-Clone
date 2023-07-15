export declare namespace UserResponse {
    interface login {
      expire: number;
      accessToken: string;
      refreshToken: string;
    }
    interface reissue {
      expire: number;
      accessToken: string;
    }
  }