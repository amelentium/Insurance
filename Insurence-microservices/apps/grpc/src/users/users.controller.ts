import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Empty, FindUserDto, User, Users, UserService } from '@app/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController implements UserService {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'Create')
  async Create(request: CreateUserDto): Promise<User> {
    return await this.usersService.create(request);
  }

  @GrpcMethod('UserService', 'FindOne')
  async FindOne(request: FindUserDto): Promise<User> {
    return await this.usersService.findOne(request);
  }

  @GrpcMethod('UserService', 'FindAll')
  async FindAll(request: Empty): Promise<Users> {
    return await this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'Update')
  async Update(request: User): Promise<User> {
    return await this.usersService.update(request);
  }

  @GrpcMethod('UserService', 'Remove')
  async Remove(request: FindUserDto): Promise<User> {
    return await this.usersService.remove(request.id);
  }
}
