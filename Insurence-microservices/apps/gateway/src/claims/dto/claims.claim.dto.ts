import { Claim, ClaimStatus, TimestampConverter, User } from "@app/common";
import { DtoFrom } from "@app/common";
import { UserTempDto } from "../../users/dto/users.user.dto";

export class ClaimDto extends DtoFrom<Claim> {
  id: string = '';
  name: string = '';
  description: string = '';
  status: ClaimStatus = ClaimStatus.OPENED;
  createdAt: Date = new Date(0);
  userId?: string = '';
  user?: ClaimUserDto = new ClaimUserDto();

  override mapFrom(claim: Claim): void {
    super.mapFrom(claim);

    this.createdAt = TimestampConverter.toDate(claim.createdAt);

    if (this.user) {
      const userDto = new ClaimUserDto();
      userDto.mapFrom(this.user as any);
      this.user = userDto;
    }
  }
}

export class ClaimUserDto extends DtoFrom<UserTempDto> {
  id: string = '';
  username: string = '';
  isActive: boolean = true;
}
