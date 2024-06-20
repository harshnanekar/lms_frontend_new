import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { ApiResponse, Filter } from "$lib/types/request.types";
import { fetchApi } from "$lib/utils/fetcher";

export type CustomOptions = {
    value: string | number;
    label: string;
}

export type GojoInfinity = {
    data: CustomOptions[];
    total: number;
    nextCursor: string | number;
}

export async function fetchOptions(url: string, filters: Filter[]): Promise<ApiResponse<GojoInfinity>> {
    console.log(url, filters);
    
    const _url = new URL(PUBLIC_API_BASE_URL + '/' + url);
    
    filters.filter(v => v.value !== undefined).forEach((filter) => {
        _url.searchParams.append(filter.key, String(filter.value));
    });

    const response = await fetchApi<GojoInfinity>({
        url: _url.href,
        method: "GET",
    });

    console.log(response);

    return response;

}