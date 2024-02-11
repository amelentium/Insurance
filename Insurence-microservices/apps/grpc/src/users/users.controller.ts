import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindUserDto, SearchFilter, User, UserResponse, Users, UsersServiceController, UsersServiceControllerMethods } from '@app/common';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  async create(createDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(createDto);
    return { user: user };
  }

  async findAll(filter: SearchFilter): Promise<Users> {
    const users = await this.usersService.findAll(filter);
    return { users: users };
  }

  async findOne(findDto: FindUserDto): Promise<UserResponse> {
    const user = await this.usersService.findOne(findDto);
    return { user: user };
  }

  async update(userDto: User): Promise<UserResponse> {
    const user = await this.usersService.update(userDto);
    return { user: user };
  }

  async remove(findDto: FindUserDto): Promise<UserResponse> {
    const user = await this.usersService.remove(findDto.id);
    return { user: user };
  }
}
