import { Claim, CreateClaimDto, UpdateClaimDto, TimestampConverter, ClaimStatus, FindAllClaimsFilter} from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class ClaimsService implements OnModuleInit {
  private readonly claims: Claim[] = [];

  onModuleInit() {
    for(let i = 1; i <= 10; i++) {
      this.create({
        name: `TestClaim${i}`,
        description: `TestPassword${i}`,
        userId: randomUUID(),
      });
    }
  }

  async create(createDto: CreateClaimDto): Promise<Claim> {
    const claim: Claim = {
      ...createDto,
      id: randomUUID(),
      createdAt: TimestampConverter.newTimestamp(),
      status: ClaimStatus.OPENED,
      user: {
        id: createDto.userId,
        username: '',
        password: '',
        isActive: true
      }
    };

    this.claims.push(claim);

    return claim;
  }

  async findAll(filter: FindAllClaimsFilter): Promise<Claim[]> {
    return this.claims.filter(claim =>  {
      let check = true;

      if (filter.userId) {
        check = claim.user.id === filter.userId;
      }

      return check;
    });
  }

  async findByUserId(userId: string): Promise<Claim[]> {
    return this.claims.filter((claim) => claim.user.id === userId);

  }

  async findOne(id: string): Promise<Claim> {
    return this.claims.find((claim) => claim.id === id);
  }

  async update(updateDto: UpdateClaimDto): Promise<Claim> {
    const claimIndex = this.claims.findIndex((claim) => claim.id === updateDto.id);

    this.claims[claimIndex] = {
      ...this.claims[claimIndex],
      ...updateDto,
    };

    return this.claims[claimIndex];
  }

  async remove(id: string): Promise<Claim> {
    const claimIndex = this.claims.findIndex((claim) => claim.id === id);
    
    return this.claims.splice(claimIndex)[0];
  }
}
