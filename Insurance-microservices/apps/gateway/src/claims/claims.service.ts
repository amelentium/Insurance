import { CLAIMS_PACKAGE_NAME, CLAIMS_SERVICE_NAME, ClaimsServiceClient, CreateClaimDto, FindAllClaimsFilter, UpdateClaimDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ClaimDto } from './dto/claims.claim.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClaimsService implements OnModuleInit {
  private ClaimsService: ClaimsServiceClient

  constructor(@Inject(CLAIMS_PACKAGE_NAME) private client: ClientGrpc) {}

  async onModuleInit() {
    this.ClaimsService = this.client.getService<ClaimsServiceClient>(CLAIMS_SERVICE_NAME)
  }

  async create(createDto: CreateClaimDto): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.create(createDto);
    const result = await firstValueFrom(observable);

    const claimDto = new ClaimDto();
    claimDto.mapFrom(result.claim);

    return claimDto;
  }

  async findAll(filter: FindAllClaimsFilter): Promise<ClaimDto[]> {
    const observable = this.ClaimsService.findAll(filter);
    const result = await firstValueFrom(observable);

    return result.claims.map(claim => {
      const claimDto = new ClaimDto();
      claimDto.mapFrom(claim);
      return claimDto;
    });
  }

  async findOne(id: string): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.findOne({ id: id });
    const result = await firstValueFrom(observable);
    if (result.claim) {
      const claimDto = new ClaimDto();
      claimDto.mapFrom(result.claim);
      return claimDto;
    }
    return undefined;
  }

  async update(updateDto: UpdateClaimDto): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.update(updateDto);
    const result = await firstValueFrom(observable);
    if (result.claim) {
      const claimDto = new ClaimDto();
      claimDto.mapFrom(result.claim);
      return claimDto;
    }
    return undefined;
  }

  async remove(id: string): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.remove({ id: id});
    const result = await firstValueFrom(observable);
    if (result.claim) {
      const claimDto = new ClaimDto();
      claimDto.mapFrom(result.claim);
      return claimDto;
    }
    return undefined;
  }
}
