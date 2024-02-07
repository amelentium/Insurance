import { User } from "@app/common";

export class UserLoginRequest {
  username: string;
  password: string;
}

export class UserLoginResponse {
  user: User;
  jwtToken: string;
}