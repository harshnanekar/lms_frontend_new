import type { HttpMethod } from '@sveltejs/kit';

export const fetchApi = async <T>({
	url,
	method,
	body,
	customOptions
}: {
	url: string;
	method: HttpMethod;
	body?: object | null;
	customOptions?: RequestInit;
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

		const response = await fetch(url, requestOptions);

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
	} catch (error: any) {
		console.log('Network error:', error);
		return { json: null, error: { message: 'Network error or something went wrong' } };
	}
};

type ApiResponse<T> =
	| {
			json: null;
			error: {
				message: string;
				[key: string]: string;
			};
	  }
	| {
			json: T;
			error: null;
	  };
