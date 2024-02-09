import { User, UsersServiceClient, USERS_PACKAGE_NAME, USERS_SERVICE_NAME, Users, FindUserDto } from '@app/common';
import { ConflictException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserLoginRequest } from './dto/UserLogin';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private UsersService: UsersServiceClient

  constructor(@Inject(USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.UsersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME)
  }

  async create(loginDto: UserLoginRequest): Promise<User> {
    const user = await this.findOne({ username: loginDto.username });
    if (user) {
      throw new ConflictException(`User already exist with same username ${loginDto.username}.`);
    }

    const observable = this.UsersService.create({ ...loginDto });
    const result = await firstValueFrom(observable);
    return result.user;
  }

  findAll(): Observable<Users> {
    return this.UsersService.findAll({});
  }

  async findOne(findDto: FindUserDto): Promise<User> {
    const observable = this.UsersService.findOne(findDto);
    const result = await firstValueFrom(observable);
    return result.user;
  }

  async update(updateDto: User): Promise<User> {
    const observable = this.UsersService.update(updateDto);
    const result = await firstValueFrom(observable);
    if (result.user) {
      return result.user;
    }

    throw new NotFoundException(`User not found by id ${updateDto.id}`);
  }

  async remove(id: string): Promise<User> {
    const observable = this.UsersService.remove({ id: id });
    const result = await firstValueFrom(observable);
    if (result.user) {
      return result.user;
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }
}
