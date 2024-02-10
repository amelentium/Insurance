/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "./timestamp";
import { User } from "./users";

export const clainsProtobufPackage = "claims";

export enum ClaimStatus {
  OPENED = 0,
  APPROVED = 1,
  DENIED = 2,
}

export interface Claim {
  id: string;
  name: string;
  description: string;
  status: ClaimStatus;
  createdAt: Timestamp | undefined;
  user: User | undefined;
}

export interface CreateClaimDto {
  name: string;
  description: string;
  userId: string;
}

export interface UpdateClaimDto {
  id: string;
  name: string;
  description: string;
  status: ClaimStatus;
}

export interface ClaimResponse {
  claim?: Claim | undefined;
}

export interface FindAllClaimsFilter {
  userId?: string | undefined;
}

export interface FindClaimDto {
  id: string;
}

export interface Claims {
  claims: Claim[];
}

export const CLAIMS_PACKAGE_NAME = "claims";

export interface ClaimsServiceClient {
  create(request: CreateClaimDto): Observable<ClaimResponse>;

  update(request: UpdateClaimDto): Observable<ClaimResponse>;

  remove(request: FindClaimDto): Observable<ClaimResponse>;

  findOne(request: FindClaimDto): Observable<ClaimResponse>;

  findAll(request: FindAllClaimsFilter): Observable<Claims>;
}

export interface ClaimsServiceController {
  create(request: CreateClaimDto): Promise<ClaimResponse> | Observable<ClaimResponse> | ClaimResponse;

  update(request: UpdateClaimDto): Promise<ClaimResponse> | Observable<ClaimResponse> | ClaimResponse;

  remove(request: FindClaimDto): Promise<ClaimResponse> | Observable<ClaimResponse> | ClaimResponse;

  findOne(request: FindClaimDto): Promise<ClaimResponse> | Observable<ClaimResponse> | ClaimResponse;

  findAll(request: FindAllClaimsFilter): Promise<Claims> | Observable<Claims> | Claims;
}

export function ClaimsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "update", "remove", "findOne", "findAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ClaimsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ClaimsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CLAIMS_SERVICE_NAME = "ClaimsService";
