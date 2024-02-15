import { Injectable } from '@nestjs/common';
import { CreateUserDto, Entity, FindUserDto, SearchFilter, User } from '@app/common';
import { PrismaService } from '../../../../prisma/prisma.service';

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

  async findAll(filter: SearchFilter): Promise<User[]> {
    try {
      const page = filter?.paging?.page || 1;
      const size = filter?.paging?.size || 25;

      const users = await this.prisma.user.findMany({
        take: size,
        skip: (page - 1) * size,
        include: { claims: filter.includeRefs || false },
      });
      return users.map(user => this.prisma.mapEntity(Entity.User, user));
    } catch {
      return [];
    }
  }

  async findOne(findDto: FindUserDto): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findUnique({ 
        where: { 
          id: findDto.id,
          username: findDto.username,
        },
        include: { claims: findDto.includeRefs || false },
      });
      return this.prisma.mapEntity(Entity.User, user);
    } catch {
      return undefined;
    }
  }

  async update(updateDto: User): Promise<User | undefined> {
    try {
      return await this.prisma.user.update({
        where: { id: updateDto.id },
        data: this.prisma.mapEntity(Entity.User, updateDto, true),
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
