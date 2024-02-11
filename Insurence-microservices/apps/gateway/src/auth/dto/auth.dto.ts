import { UserDto } from "../../users/dto/user.login.dto";

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  user: UserDto;
  token: string;
}
