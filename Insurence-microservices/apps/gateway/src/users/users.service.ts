import { User, UsersServiceClient, USERS_PACKAGE_NAME, USERS_SERVICE_NAME, FindUserDto, SearchFilter } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserTempDto } from './dto/users.user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private UsersService: UsersServiceClient

  constructor(@Inject(USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.UsersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME)
  }

  async create(loginDto: { username: string, password: string }): Promise<UserTempDto | undefined> {
    let user = await this.findOne({ username: loginDto.username });
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

    const userDto = new UserTempDto();
    userDto.mapFrom(result.user);
    return userDto;
  }

  async findAll(searchFilter: SearchFilter = {}): Promise<UserTempDto[]> {
    const observable = this.UsersService.findAll(searchFilter);
    const result = await firstValueFrom(observable);

    return result.users.map(user => {
      const userDto = new UserTempDto();
      userDto.mapFrom(user);
      return userDto;
    });
  }

  async findOne(findDto: FindUserDto): Promise<UserTempDto | undefined> {
    const observable = this.UsersService.findOne(findDto);
    const result = await firstValueFrom(observable);
    if (result.user) {
      const userDto = new UserTempDto();
      userDto.mapFrom(result.user);
      return userDto;
    }
    return undefined;
  }

  async update(updateDto: User): Promise<UserTempDto | undefined> {
    const observable = this.UsersService.update(updateDto);
    const result = await firstValueFrom(observable);
    if (result.user) {
      const userDto = new UserTempDto();
      userDto.mapFrom(result.user);
      return userDto;
    }
    return undefined;
  }

  async remove(id: string): Promise<UserTempDto | undefined> {
    const observable = this.UsersService.remove({ id: id });
    const result = await firstValueFrom(observable);
    if (result.user) {
      const userDto = new UserTempDto();
      userDto.mapFrom(result.user);
  
      return userDto;
    }
    return undefined;
  }
}
