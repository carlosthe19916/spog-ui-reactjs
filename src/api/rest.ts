import axios from "axios";
import { PaginatedResult, RequestParams } from "./models";

export const getPaginatedResult = <T>(
  url: string,
  params: RequestParams = {}
): Promise<PaginatedResult<T>> =>
  axios
    .get<T[]>(url, {
      params: serializeRequestParamsForHub(params),
    })
    .then(({ data, headers }) => ({
      data,
      total: headers["x-total"] ? parseInt(headers["x-total"], 10) : 0,
      params,
    }));

export const serializeRequestParamsForHub = (
  deserializedParams: RequestParams
): URLSearchParams => {
  const serializedParams = new URLSearchParams();
//   serializeFilterRequestParamsForHub(deserializedParams, serializedParams);
//   serializeSortRequestParamsForHub(deserializedParams, serializedParams);
//   serializePaginationRequestParamsForHub(deserializedParams, serializedParams);
  return serializedParams;
};
