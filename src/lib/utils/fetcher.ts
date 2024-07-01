import type { ApiResponse } from '$lib/types/request.types';
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
	} catch (error: unknown) {
		console.log('Network error:', error);
		return { json: null, error: { message: 'Network error or something went wrong' } };
	}
};

export const fetchFormApi = async <T>({
	url,
	method,
	body,
	customOptions
}: {
	url: string;
	method: HttpMethod;
	body?: FormData | null; // Change the type to FormData
	customOptions?: RequestInit;
}): Promise<ApiResponse<T>> => {
	try {
		const requestOptions: RequestInit = {
			method,
			credentials: 'include',
			...customOptions
		};

		if (method !== 'GET' && body) {
			requestOptions.body = body; // Use FormData directly
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
	} catch (error: unknown) {
		console.log('Network error:', error);
		return { json: null, error: { message: 'Network error or something went wrong' } };
	}
};



// import type { ApiResponse } from '$lib/types/request.types';
// import type { HttpMethod } from '@sveltejs/kit';

// export const fetchFormApi = async <T>({
//   url,
//   method,
//   body,
//   customOptions
// }: {
//   url: string;
//   method: HttpMethod;
//   body?: object | FormData | null;
//   customOptions?: RequestInit;
// }): Promise<ApiResponse<T>> => {
//   try {
//     const requestOptions: RequestInit = {
//       method,
//       credentials: 'include',
//       ...customOptions
//     };

//     if (body instanceof FormData) {
//       // Do not set Content-Type for FormData
//       requestOptions.body = body;
//     } else if (method !== 'GET' && body) {
//       // Set Content-Type for JSON requests
//       requestOptions.headers = {
//         'Content-Type': 'application/json',
//         ...requestOptions.headers
//       };
//       requestOptions.body = JSON.stringify(body);
//     }

//     const response = await fetch(url, requestOptions);

//     let errorData = null;

//     if (!response.ok) {
//       try {
//         errorData = await response.json();
//       } catch {
//         errorData = { message: 'Error' };
//       }
//       return { json: null, error: errorData };
//     }

//     const json = (await response.json()) as T;
//     return { json, error: null };
//   } catch (error: unknown) {
//     console.log('Network error:', error);
//     return { json: null, error: { message: 'Network error or something went wrong' } };
//   }
// };

