import { Injectable } from '@nestjs/common';
import { CreateUserDto, FindUserDto, User } from '@app/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async create(createDto: CreateUserDto): Promise<User | undefined> {
    try {
      return await this.prisma.user.create({ data: createDto });
    } catch {
      return undefined;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch {
      return [];
    }
  }

  async findOne(findDto: FindUserDto): Promise<User | undefined> {
    try {
      return await this.prisma.user.findUnique({ 
        where: { 
          id: findDto.id,
          username: findDto.username,
        } 
      });
    } catch {
      return undefined;
    }
  }

  async update(updateDto: User): Promise<User | undefined> {
    try {
      return await this.prisma.user.update({
        where: { id: updateDto.id },
        data: updateDto,
      });
    } catch {
      return undefined;
    }
  }

  async remove(id: string): Promise<User | undefined> { 
    try {   
      return await this.prisma.user.delete({ where: { id: id } });
    } catch {
      return undefined;
    }
  }
}
