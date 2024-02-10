export class UserLoginRequest {
  username: string;
  password: string;
}

export class UserLoginResponse {
  user: UserDto;
  token: string;
}

export interface UserDto {
  id: string;
  username: string;
  isActive: boolean;
}
