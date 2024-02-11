import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto, FindAllClaimsFilter, UpdateClaimDto } from '@app/common';
import { ClaimDto } from './dto/claim.dto';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createClaimDto: CreateClaimDto) {
    const userId = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('Invalid token.');
    }
    createClaimDto.userId = userId;
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
