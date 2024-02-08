import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Empty, FindUserDto, User, UserResponse, Users, UsersServiceController, UsersServiceControllerMethods } from '@app/common';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  async create(request: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(request);
    return { user: user };
  }

  async findOne(request: FindUserDto): Promise<UserResponse> {
    const user = await this.usersService.findOne(request);
    return { user: user };
  }

  async findAll(request: Empty): Promise<Users> {
    const users = await this.usersService.findAll();    
    return { users: users };
  }

  async update(request: User): Promise<UserResponse> {
    const user = await this.usersService.update(request);    
    return { user: user };
  }

  async remove(request: FindUserDto): Promise<UserResponse> {
    const user = await this.usersService.remove(request.id);    
    return { user: user };
  }
}
