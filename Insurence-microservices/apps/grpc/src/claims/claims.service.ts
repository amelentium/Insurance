import { Claim, CreateClaimDto, UpdateClaimDto, TimestampConverter, ClaimStatus, FindAllClaimsFilter} from '@app/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
        include: { user: true },
      });

      return this.mapClaim(claim);
    } catch {
      return undefined;
    }
  }

  async findAll(filter: FindAllClaimsFilter): Promise<Claim[]> {
    try {
      const claims = await this.prisma.claim.findMany({
        where: { userId: filter.userId },
        include: { user: true },
      });
      return claims.map(claim => this.mapClaim(claim));
    } catch {
      return undefined;
    }
  }

  async findOne(id: string): Promise<Claim | undefined> {
    try {
      const claim = await this.prisma.claim.findMany({
        where: { id: id },
        include: { user: true },
      });
      return this.mapClaim(claim);
    } catch {
      return undefined;
    }
  }

  async update(updateDto: UpdateClaimDto): Promise<Claim | undefined> {
    try {
      const claim = await this.prisma.claim.update({
        where: { id: updateDto.id },
        data: { ...this.mapClaim(updateDto, false) },
        include: { user: true },
      });
      return this.mapClaim(claim);
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
      return this.mapClaim(claim);
    } catch {
      return undefined;
    }
  }

  private mapClaim(claim: any, toClaim: boolean = true): Claim | any {
    if (toClaim) {
      claim.status = ClaimStatus[claim.status];
      claim.createdAt = TimestampConverter.fromDate(claim.createdAt);
      return claim as Claim;
    } else {
      if (claim.status)
        claim.status = ClaimStatus[claim.status] as any;
      if (claim.createdAt)
        claim.createdAt = TimestampConverter.toDate(claim.createdAt);
      return claim;
    }
  }
}
