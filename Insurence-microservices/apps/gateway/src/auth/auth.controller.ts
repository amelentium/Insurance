import { Controller, Get, Post, Body, NotFoundException, ConflictException, BadRequestException, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';
import { UserLoginRequest, UserLoginResponse } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

  @Post('registry')
  async registry(@Body() loginDto: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.usersService.create(loginDto);
    if (user) {
      const jwt = await this.authService.signIn(user, loginDto.password);
      if (jwt) {
        delete user.password;
        return {
          user: user,
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
        delete user.password;
        return {
          user: user,
          token: jwt,
        };
      }
    }
    throw new BadRequestException('Invalid credentials entered.');
  }
  
  @UseGuards(AuthGuard)
  @Get('current')
  async findCurrent(@Request() req) {
    const userId = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('Invalid token.');
    }

    const user = await this.usersService.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException(`User not found by id ${userId}.`);
    }

    delete user.password;
    return user;
  }
}
