import { Claim, ClaimStatus, DtoFrom, TimestampConverter, User } from "@app/common";

export class UserDto extends DtoFrom<UserTempDto> {
  id: string = '';
  username: string = '';
  isActive: boolean = true;
  claims?: UserClaimDto[] = [];
}

export class UserTempDto extends DtoFrom<User> {
  id: string = '';
  username: string = '';
  password: string = '';
  isActive: boolean = true;
  claims?: UserClaimDto[] = [];

  override mapFrom(user: User): void {
    super.mapFrom(user);
    
    if (user.claims) {
      this.claims = user.claims.map(claim => {
        const claimDto = new UserClaimDto();
        claimDto.mapFrom(claim);
        return claimDto;
      });
    }
  }
}

export class UserClaimDto extends DtoFrom<Claim>  {
  id: string = '';
  name: string = '';
  description: string = '';
  status: ClaimStatus = ClaimStatus.OPENED;
  createdAt: Date = new Date(0);

  override mapFrom(claim: Claim): void {
    super.mapFrom(claim);
    this.createdAt = TimestampConverter.toDate(claim.createdAt);
  }
}
