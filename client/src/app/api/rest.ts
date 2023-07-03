import axios from "axios";
import { Advisory, ApiPaginatedResult, ApiRequestParams } from "./models";
import { serializeRequestParamsForApi } from "@app/shared/hooks/table-controls";

const API_V1 = "/api/v1";

const SEARCH_ADVISORY = API_V1 + "/advisory/search";

interface ApiSearchResult<T> {
  total: number;
  result: T[];
}

export const getApiPaginatedResult = <T>(
  url: string,
  params: ApiRequestParams = {}
): Promise<ApiPaginatedResult<T>> =>
  axios
    .get<ApiSearchResult<T>>(url, {
      params: serializeRequestParamsForApi(params),
    })
    .then(({ data }) => ({
      data: data.result,
      total: data.total,
      params,
    }));

export const getAdvisories = (params: ApiRequestParams = {}) => {
  return getApiPaginatedResult<Advisory>(SEARCH_ADVISORY, params);
};
