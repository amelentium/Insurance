import { ClaimStatus } from "@app/common";

export interface UserDto {
  id: string;
  username: string;
  isActive: boolean;
  claims?: UserClaimDto[];
}

export interface UserClaimDto {
  id: string;
  name: string;
  description: string;
  status: ClaimStatus;
  createdAt: Date;
}
