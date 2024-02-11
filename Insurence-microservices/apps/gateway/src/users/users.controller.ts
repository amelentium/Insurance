import { Controller, Get, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@app/common';
import { UserDto } from './dto/user.login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => { 
      delete user.password
      return user 
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne({ id: id });
    if (user) {
      delete user.password;
      return user;
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: User): Promise<UserDto> {
    updateDto.id = id;
    const user = await this.usersService.update(updateDto);
    if (user) {
      delete user.password;
      return user;
    }
    throw new NotFoundException(`User not found by id ${updateDto.id}.`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.remove(id);
    if (user) {
      delete user.password;
      return user;
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }
}
