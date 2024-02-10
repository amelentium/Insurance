import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@app/common';
import { UserDto, UserLoginRequest, UserLoginResponse } from './dto/UserLogin';
import { AuthService } from '../auth/auth.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

  @Post('registry')
  async registry(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.usersService.create(loginDto);
    if (user) {
      const jwt = await this.authService.signIn(user, loginDto.password);
      if (jwt) {
        const { id, username, isActive } = user;

        return {
          user: { id, username, isActive },
          token: jwt,
        };
      }
    }
    throw new ConflictException(`User already exist with same username ${loginDto.username}.`);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.usersService.findOne({ username: loginDto.username });
    if (user) {
      const jwt = await this.authService.signIn(user, loginDto.password);
      if (jwt) {
        const { id, username, isActive } = user;

        return {
          user: { id, username, isActive },
          token: jwt,
        };
      }
    }
    throw new BadRequestException('Invalid credentials entered.');
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne({ id: id });
    if (user) {
      return user;
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: User): Promise<UserDto> {
    updateDto.id = id;
    const user = await this.usersService.update(updateDto);
    if (user) {
      return user;
    }

    throw new NotFoundException(`User not found by id ${updateDto.id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.remove(id);
    if (user) {
      return user;
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }
}
