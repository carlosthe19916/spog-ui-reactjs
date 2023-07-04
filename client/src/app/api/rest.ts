import axios from "axios";
import { Advisory, AdvisoryDetails, ApiPaginatedResult, ApiRequestParams } from "./models";
import { serializeRequestParamsForApi } from "@app/shared/hooks/table-controls";

const API_V1 = "/api/v1";

const ADVISORY = API_V1 + "/advisory";
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

export const getAdvisoryById = (id: string) => {
  return axios.get<AdvisoryDetails>(`${ADVISORY}?id=${id}`);
};

export const getAdvisories = (params: ApiRequestParams = {}) => {
  return getApiPaginatedResult<Advisory>(SEARCH_ADVISORY, params);
};
