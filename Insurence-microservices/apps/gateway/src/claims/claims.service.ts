import { CLAIMS_PACKAGE_NAME, CLAIMS_SERVICE_NAME, Claims, ClaimsServiceClient, CreateClaimDto, FindAllClaimsFilter, UpdateClaimDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ClaimDto } from './dto/claim.dto';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable()
export class ClaimsService implements OnModuleInit {
  private ClaimsService: ClaimsServiceClient

  constructor(@Inject(CLAIMS_PACKAGE_NAME) private client: ClientGrpc) {}

  async onModuleInit() {
    this.ClaimsService = this.client.getService<ClaimsServiceClient>(CLAIMS_SERVICE_NAME)
  }

  async create(createDto: CreateClaimDto): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.create(createDto);
    const claim = (await firstValueFrom(observable)).claim;
    return ClaimDto.fromClaim(claim);
  }

  findAll(filter: FindAllClaimsFilter): Observable<ClaimDto[]> {
    return this.ClaimsService.findAll({ ...filter })
               .pipe(map((claims: Claims) =>
                          claims.claims.map(claim => ClaimDto.fromClaim(claim))));
  }

  async findOne(id: string): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.findOne({ id: id });
    const claim = (await firstValueFrom(observable)).claim;
    return ClaimDto.fromClaim(claim);
  }

  async update(updateDto: UpdateClaimDto): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.update(updateDto);
    const claim = (await firstValueFrom(observable)).claim;
    return ClaimDto.fromClaim(claim);
  }

  async remove(id: string): Promise<ClaimDto | undefined> {
    const observable = this.ClaimsService.remove({ id: id});
    const claim = (await firstValueFrom(observable)).claim;
    return ClaimDto.fromClaim(claim);
  }
}
