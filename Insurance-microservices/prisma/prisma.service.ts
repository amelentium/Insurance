import { ClaimStatus, Entity, TimestampConverter } from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  maps = new Map<string, Function>([
    [Entity.User, (user: any, toDbEntity: boolean) => {
      if (user.claims)
        user.claims = user.claims.map(claim => this.mapEntity('claim', claim, toDbEntity));
      return user
    }],
    [Entity.Claim, (claim: any, toDbEntity: boolean) => {
      if (toDbEntity) {
        claim.status = ClaimStatus[claim.status];
        claim.createdAt = TimestampConverter.toDate(claim.createdAt);
      } else {
        if (claim.status)
          claim.status = ClaimStatus[claim.status] as any;
        if (claim.createdAt)
          claim.createdAt = TimestampConverter.fromDate(claim.createdAt);
      }
      return claim;
    }],
  ]);

  mapEntity(mapName: string, entity: any, toDbEntity: boolean = false): any {
    const mapFunction = this.maps.get(mapName);
    return mapFunction(entity, toDbEntity);
  }
}
