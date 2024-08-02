import { PRIVATE_API_BASE_URL, PRIVATE_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch,params }) => {
    
    const {id,type} = params;
	console.log('type ',type)
	
    const moduleUrl = type === 'te' ? `/update-teach-view-data?id=${id}` : type === 'ms' ? `/update-meeting-view-data?id=${id}` 
    : `/update-branding-view-data?id=${id}`

	console.log('id and type ',id,type,moduleUrl);

    
    const { error : err, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}${moduleUrl}`,
		_fetch: fetch,
		cookies: cookies,
		method: 'GET'
	});

	// if (error) {
	// 	fail(500, {
	// 		message: error.message
	// 	});
	// }

	if (err && err.status === 'UNAUTHORIZED') {
        redirect(303, `${PRIVATE_BASE_URL}login`);
    }

	if (err) {
        error(500,'Internal Server Error')
    }


    console.log('json ',JSON.stringify(json));
	return {
		inputData: json,
		type : type,
		id :id
	};
};