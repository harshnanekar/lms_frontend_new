import { goto } from '$app/navigation';
import type { ApiResponse } from '$lib/types/request.types';
import type { HttpMethod } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

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

			if(errorData.status === 401){
			 goto('/login');
			}

			return { json: null, error: errorData };
		}

		const json = (await response.json()) as T;
		return { json, error: null };

	} catch (error: unknown | any) {
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
	body?: FormData | null; 
	customOptions?: RequestInit;
}): Promise<ApiResponse<T>> => {
	try {
		const requestOptions: RequestInit = {
			method,
			// headers:{
			// 	'Accept':'application/json',
			// },
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
			if(errorData.status === 401){
				goto('/login');
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


export const downloadFetch = async <T>({
    url,
    method,
    body,
    customOptions,
    isDownload = false,
    downloadFileName = 'file.zip'
}: {
    url: string;
    method: HttpMethod;
    body?: FormData | null;
    customOptions?: RequestInit;
    isDownload?: boolean;
    downloadFileName?: string;
}): Promise<ApiResponse<T>> => {
    try {
        const requestOptions: RequestInit = {
            method,
            credentials: 'include',
            ...customOptions
        };

        if (method !== 'GET' && body) {
            requestOptions.body = body;
        }

        console.log('Request URL:', url);
        console.log('Request Options:', requestOptions);

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            let errorData = null;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: 'Error' };
            }
            console.log('Response Error:', errorData);
            return { json: null, error: errorData };
        }

        if (isDownload) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            a.download = downloadFileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            return { json: null, error: null } as ApiResponse<T>;
        } else {
            const json = (await response.json()) as T;
            return { json, error: null };
        }
    } catch (error: unknown) {
        console.log('Network error:', error);
        return { json: null, error: { message: 'Network error or something went wrong' } };
    }
};


export async function fetchFiles(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }

  const blob = await response.blob();
  console.log('blob ',blob)
  const fileName = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'file';
  const file = new File([blob], fileName, { type: blob.type });

  return {
    file,
    name: file.name,
    url: URL.createObjectURL(file),
    size: file.size,
    lastModified: new Date().toISOString() 
  };
}


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

