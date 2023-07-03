export interface ApiFilter {
  field: string;
  operator?: "=" | "!=" | "~" | ">" | ">=" | "<" | "<=";
  value:
    | string
    | number
    | {
        list: (string | number)[];
        operator?: "AND" | "OR";
      };
}

export interface ApiRequestParams {
  filters?: ApiFilter[];
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  page?: {
    pageNumber: number; // 1-indexed
    itemsPerPage: number;
  };
}

export interface ApiPaginatedResult<T> {
  data: T[];
  total: number;
  params: ApiRequestParams;
}

//

export interface Advisory {
  id: string;
  title: string;
  snippet: string;
  desc: string;
  date: string;
  cves: string[];
  cvss_max: number;
  href: string;
}