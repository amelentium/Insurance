import { Controller } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimResponse, ClaimsServiceController, ClaimsServiceControllerMethods, CreateClaimDto, FindClaimDto, FindAllClaimsFilter, UpdateClaimDto, Claims } from '@app/common';

@Controller()
@ClaimsServiceControllerMethods()
export class ClaimsController implements ClaimsServiceController {
  constructor(private readonly claimsService: ClaimsService) {}

  async create(createDto: CreateClaimDto): Promise<ClaimResponse> {
    const claim = await this.claimsService.create(createDto);
    return { claim: claim };
  }
  
  async findAll(filter: FindAllClaimsFilter): Promise<Claims> {
    const claims = await this.claimsService.findAll(filter);
    return { claims: claims };
  }
  
  async findOne(findDto: FindClaimDto): Promise<ClaimResponse> {
    const claim = await this.claimsService.findOne(findDto);
    return { claim: claim };
  }
  
  async update(updateDto: UpdateClaimDto): Promise<ClaimResponse> {
    const claim = await this.claimsService.update(updateDto);
    return { claim: claim };
  }
  
  async remove(findDto: FindClaimDto): Promise<ClaimResponse> {
    const claim = await this.claimsService.remove(findDto.id);
    return { claim: claim };
  }
}
