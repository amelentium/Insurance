import { Claim, CreateClaimDto, UpdateClaimDto, FindAllClaimsFilter, FindClaimDto, Entity} from '@app/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ClaimsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateClaimDto): Promise<Claim | undefined> {
    try {
      const claim: any = await this.prisma.claim.create({
        data: {
          name: createDto.name,
          description: createDto.description,
          userId: createDto.userId,
        },
      });

      return this.prisma.mapEntity(Entity.Claim, claim);
    } catch {
      return undefined;
    }
  }

  async findAll(filter: FindAllClaimsFilter): Promise<Claim[]> {
    try {
      const paging = filter.searchFilter?.paging;
      const page = paging?.page || 1;
      const size = paging?.size || 25;

      const claims = await this.prisma.claim.findMany({
        take: size,
        skip: (page - 1) * size,
        where: { userId: filter.userId },
        include: { user: filter.searchFilter?.includeRefs || false },
      });
      return claims.map(claim => this.prisma.mapEntity(Entity.Claim, claim));
    } catch {
      return undefined;
    }
  }

  async findOne(findDto: FindClaimDto): Promise<Claim | undefined> {
    try {
      const claim = await this.prisma.claim.findMany({
        where: { id: findDto.id },
        include: { user: findDto.includeRefs || false },
      });
      return this.prisma.mapEntity(Entity.Claim, claim);
    } catch {
      return undefined;
    }
  }

  async update(updateDto: UpdateClaimDto): Promise<Claim | undefined> {
    try {
      const claim = await this.prisma.claim.update({
        where: { id: updateDto.id },
        data: { ...this.prisma.mapEntity(Entity.Claim, updateDto, true) },
        include: { user: true },
      });
      return this.prisma.mapEntity(Entity.Claim, claim);
    } catch (ex) {
      return undefined;
    }
  }

  async remove(id: string): Promise<Claim | undefined> {
    try {
      const claim = await this.prisma.claim.delete({
        where: { id: id },
        include: { user: true },
      });
      return this.prisma.mapEntity(Entity.Claim, claim);
    } catch {
      return undefined;
    }
  }
}
