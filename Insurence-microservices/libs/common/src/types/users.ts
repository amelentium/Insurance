/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { SearchFilter } from "./shared";
import { Claim } from "./claims";

export const usersProtobufPackage = "users";

export interface User {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
  claims?: Claim[];
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface UserResponse {
  user?: User | undefined;
}

export interface FindUserDto {
  id?: string | undefined;
  username?: string | undefined;
  includeRefs?: boolean | undefined;
}

export interface Users {
  users: User[];
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  create(request: CreateUserDto): Observable<UserResponse>;

  update(request: User): Observable<UserResponse>;

  remove(request: FindUserDto): Observable<UserResponse>;

  findOne(request: FindUserDto): Observable<UserResponse>;

  findAll(request: SearchFilter): Observable<Users>;
}

export interface UsersServiceController {
  create(request: CreateUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  update(request: User): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  remove(request: FindUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  findOne(request: FindUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  findAll(request: SearchFilter): Promise<Users> | Observable<Users> | Users;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "update", "remove", "findOne", "findAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
