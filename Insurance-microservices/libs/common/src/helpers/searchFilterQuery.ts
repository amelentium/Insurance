import { SearchFilter } from "../types";

export class SearchFilterQuery {
  page?: number;
  size?: number;
  includeRefs?: boolean;

  static toFilter(query: SearchFilterQuery): SearchFilter {
    return {
      paging: {
        page: query?.page,
        size: query?.size,
      },
      includeRefs: query?.includeRefs,
    };
  }
}
