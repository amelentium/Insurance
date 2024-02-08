import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Users } from '@app/common';
import { UserLoginRequest, UserLoginResponse } from './dto/UserLogin';
import { Observable } from 'rxjs';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registry')
  async registry(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.usersService.create(loginDto);
    if (user) {
      return {
        user: user,
        jwtToken: 'userJwtToken',
      };
    }
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.usersService.findOne({ username: loginDto.username });
    if (user) {
      const response: UserLoginResponse = {
        user: user,
        jwtToken: 'userJwtToken',
      }

      return response;
    }

    throw new NotFoundException(`User not found by username ${loginDto.username}`);
  }

  @Get()
  findAll(): Observable<Users> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne({ id: id });
    if (user) {
      return user;
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    updateUserDto.id = id;
    return await this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }
}
