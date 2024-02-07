import { CreateUserDto, FindUserDto, USER_SERVICE, User, UserServiceClientImpl, UserServiceServiceName, Users } from '@app/common';
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserLoginRequest, UserLoginResponse } from './dto/UserLogin';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClientImpl

  constructor(@Inject(USER_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClientImpl>(UserServiceServiceName)
  }

  async registry(loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const findDto: FindUserDto = { username: loginDto.username };

    let user = await this.userService.FindOne(findDto);
    if (user) {
      throw new ConflictException(`User already exist with same username ${loginDto.username}.`);
    }

    const createDto: CreateUserDto = { ...loginDto };

    user = await this.userService.Create(createDto);
    if (user) {
      const response: UserLoginResponse = {
        user: user,
        jwtToken: 'userJwtToken',
      }

      return response;
    }

    throw new InternalServerErrorException('Something went wrong. Please try again later.');
  }

  async login(loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const findDto: FindUserDto = { username: loginDto.username };
    const user = await this.userService.FindOne(findDto);
    if (user) {
      const response: UserLoginResponse = {
        user: user,
        jwtToken: 'userJwtToken',
      }

      return response;
    }

    throw new NotFoundException(`User not found by username ${loginDto.username}`);
  }

  async findAll(): Promise<Users> {
    return await this.userService.FindAll({});
  }

  async findOne(id: string): Promise<User> {
    const findDto: FindUserDto = { id: id };
    return await this.userService.FindOne(findDto);
  }

  async update(updateUserDto: User): Promise<User> {
    return await this.userService.Update(updateUserDto);
  }

  async remove(id: string): Promise<User> {
    const findDto: FindUserDto = { id: id };
    return await this.userService.Remove(findDto);
  }
}
