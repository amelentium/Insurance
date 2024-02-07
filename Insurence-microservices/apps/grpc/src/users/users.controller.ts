import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Empty, FindUserDto, User, Users, UserService } from '@app/common';

@Controller()
export class UsersController implements UserService {
  constructor(private readonly usersService: UsersService) {}

  async Create(request: CreateUserDto): Promise<User> {
    return await this.usersService.create(request);
  }

  async FindOne(request: FindUserDto): Promise<User> {
    return await this.usersService.findOne(request);
  }

  async FindAll(request: Empty): Promise<Users> {
    return await this.usersService.findAll();
  }

  async Update(request: User): Promise<User> {
    return await this.usersService.update(request);
  }

  async Remove(request: FindUserDto): Promise<User> {
    return await this.usersService.remove(request.id);
  }
}
