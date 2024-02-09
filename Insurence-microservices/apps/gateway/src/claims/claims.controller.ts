import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto, FindAllClaimsFilter, UpdateClaimDto } from '@app/common';
import { ClaimDto } from './dto/claim.dto';
import { Observable } from 'rxjs';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  async create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  findAll(@Query() filter: FindAllClaimsFilter): Observable<ClaimDto[]> {
    return this.claimsService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.claimsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    updateClaimDto.id = id;
    return this.claimsService.update(updateClaimDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.claimsService.remove(id);
  }
}
