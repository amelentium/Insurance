import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Users } from '@app/common';
import { UserLoginRequest, UserLoginResponse } from './dto/UserLogin';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registry')
  async registry(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    return await this.usersService.registry(loginDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    return await this.usersService.login(loginDto);
  }

  @Get()
  async findAll(): Promise<Users> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (user) {
      return ;
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
