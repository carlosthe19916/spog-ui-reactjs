import { RequestParams } from "@app/api/models";
import { SearchResult } from "@app/models/search";
import { VulnSummary } from "@app/models/vulnerabilities";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const VulnerabilitiesQueryKey = "vulnerabilities";

export const useFetchVulnerabilities = (
  pagination: { page: number; size: number },
  q?: string
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [VulnerabilitiesQueryKey],
    queryFn: (): Promise<SearchResult<VulnSummary>> => {
      const serializedParams = new URLSearchParams();
      if (q) {
        serializedParams.append("q", q);
      }
      serializedParams.append(
        "offset",
        `${(pagination.page - 1) * pagination.size}`
      );
      serializedParams.append("limit", `${pagination.size}`);

      return axios
        .get(`/vulnerability/search`, { params: serializedParams })
        .then((response) => response.data);
    },
    onError: (error: AxiosError) => console.log("error, ", error),
  });
  return {
    stakeholders: data || [],
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};
