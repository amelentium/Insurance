/* eslint-disable */
export const sharedProtobufPackage = "shared";

export interface Empty {
}

export interface PaginationFilter {
  page: number;
  size: number;
}

export interface SearchFilter {
  paging?: PaginationFilter | undefined;
  includeRefs?: boolean | undefined;
}

export const SHARED_PACKAGE_NAME = "shared";
