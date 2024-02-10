import { User, UsersServiceClient, USERS_PACKAGE_NAME, USERS_SERVICE_NAME, FindUserDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserLoginRequest } from './dto/UserLogin';
import { firstValueFrom, } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  private UsersService: UsersServiceClient

  constructor(@Inject(USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.UsersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME)
  }

  async create(loginDto: UserLoginRequest): Promise<User | undefined> {
    const user = await this.findOne({ username: loginDto.username });
    if (user) {
      return undefined;
    }
    
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(loginDto.password, salt);

    const observable = this.UsersService.create({
      ...loginDto,
      password: passHash,
    });    
    const result = await firstValueFrom(observable);
    return result.user;
  }

  async findAll(): Promise<User[]> {
    const observable = this.UsersService.findAll({});
    const result = await firstValueFrom(observable);
    return result.users;
  }

  async findOne(findDto: FindUserDto): Promise<User | undefined> {
    const observable = this.UsersService.findOne(findDto);
    const result = await firstValueFrom(observable);
    if (result.user) {
      return result.user;
    }
    return undefined;
  }

  async update(updateDto: User): Promise<User | undefined> {
    const observable = this.UsersService.update(updateDto);
    const result = await firstValueFrom(observable);
    if (result.user) {
      return result.user;
    }
    return undefined;
  }

  async remove(id: string): Promise<User | undefined> {
    const observable = this.UsersService.remove({ id: id });
    const result = await firstValueFrom(observable);
    if (result.user) {
      return result.user;
    }
    return undefined;
  }
}
