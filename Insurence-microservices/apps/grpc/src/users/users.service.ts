import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, User, Users } from '@app/common';
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

  async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<Users> {
    return { users: this.users };
  }

  async update(updateDto: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === updateDto.id);

    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateDto,
      };
      return this.users[userIndex];
    }

    throw new NotFoundException(`User not found by id ${updateDto.id}.`);
  }

  async remove(id: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }

    throw new NotFoundException(`User not found by id ${id}.`);
  }
}
