import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@app/common';
import { SearchFilterQuery } from '@app/common/helpers/searchFilterQuery';
import { UserDto } from './dto/users.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: SearchFilterQuery): Promise<UserDto[]> {
    const filter = SearchFilterQuery.toFilter(query);
    const users = await this.usersService.findAll(filter);

    return users.map(user => {
      const userDto = new UserDto();
      userDto.mapFrom(user);
      return userDto;
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('includeRefs') includeRefs: boolean): Promise<UserDto> {
    const user = await this.usersService.findOne({ id: id, includeRefs: includeRefs });
    if (user) {
      const userDto = new UserDto();
      userDto.mapFrom(user);
      return userDto;
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: User): Promise<UserDto> {
    updateDto.id = id;
    const user = await this.usersService.update(updateDto);
    if (user) {
      const userDto = new UserDto();
      userDto.mapFrom(user);
      return userDto;
    }
    throw new NotFoundException(`User not found by id ${updateDto.id}.`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.remove(id);
    if (user) {
      const userDto = new UserDto();
      userDto.mapFrom(user);
      return userDto;
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }
}
