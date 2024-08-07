import { goto } from '$app/navigation';
import type { ApiResponse } from '$lib/types/request.types';
import { redirect, type Cookies, type HttpMethod } from '@sveltejs/kit';

export const fetchApiServer = async <T>({
	url,
	method,
	body,
	customOptions,
	cookies,
	_fetch
}: {
	url: string;
	method: HttpMethod;
	body?: object | null;
	customOptions?: RequestInit;
	cookies: Cookies;
	_fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
}): Promise<ApiResponse<T>> => {
	try {
		const requestOptions: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			...customOptions
		};

		if (method !== 'GET' && body) {
			requestOptions.body = JSON.stringify(body);
		}

		for(const obj of cookies.getAll()) {
			requestOptions.headers = {
				...requestOptions.headers,
				[obj.name]: obj.value
			};
		}
		console.log("requestOptions>>>>>>>>", requestOptions);
		
		const response = await _fetch(url, requestOptions);

		let errorData = null;

		if (!response.ok) {
			try {
				errorData = await response.json();
			} catch {
				errorData = { message: 'Error' };
			}

			return { json: null, error: errorData };
		}

		const json = (await response.json()) as T;
		return { json, error: null };
	} catch (error: unknown) {
		console.log('Network error:', error);
		return { json: null, error: { message: 'Network error or something went wrong' } };
	}
};
