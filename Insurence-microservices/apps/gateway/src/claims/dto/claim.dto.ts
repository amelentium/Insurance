import { Claim, ClaimStatus, TimestampConverter, User } from "@app/common";

export class ClaimDto {
  id: string;
  name: string;
  description: string;
  status: ClaimStatus;
  createdAt: Date;
  user: User;

  static fromClaim(claim: Claim): ClaimDto | undefined {
    return claim ? {
      id: claim.id,
      name: claim.name,
      description: claim.description,
      status: claim.status,
      createdAt: TimestampConverter.toDate(claim.createdAt),
      user: claim.user,
    } : undefined;
  }
}
