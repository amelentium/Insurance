import { UserDto } from "../../users/dto/users.user.dto";

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  user: UserDto;
  token: string;
}
