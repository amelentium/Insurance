import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, FindUserDto, User } from '@app/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for(let i = 1; i <= 10; i++) {
      this.create({username: `TestUser${i}`, password: `TestPassword${i}`});
    }
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const user: User = {
      ...createDto,
      id: randomUUID(),
      isActive: true,
    };

    this.users.push(user);

    return user;
  }

  async findOne(findDto: FindUserDto): Promise<User> {
    return this.users.find((user) => (findDto.id && user.id === findDto.id)
                                  || (user.username === findDto.username));
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(updateDto: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === updateDto.id);

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateDto,
    };

    return this.users[userIndex];
  }

  async remove(id: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    
    return this.users.splice(userIndex)[0];
  }
}
