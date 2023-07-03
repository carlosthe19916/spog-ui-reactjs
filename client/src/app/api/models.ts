export interface Filter {
  field: string;
  operator?: "=" | "!=" | "~" | ">" | ">=" | "<" | "<=";
  value:
    | string
    | number
    | {
        list: string[];
        operator?: "AND" | "OR";
      };
}

export interface RequestParams {
  filters?: Filter[];
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  page?: {
    pageNumber: number; // 1-indexed
    itemsPerPage: number;
  };
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  params: RequestParams;
}
