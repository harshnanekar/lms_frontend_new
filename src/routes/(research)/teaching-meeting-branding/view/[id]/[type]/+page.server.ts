import { PRIVATE_API_BASE_URL, PRIVATE_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch,params }) => {
    
    const {id,type} = params;
	
    const moduleUrl = type === 'te' ? `/view-teaching-data?id=${id}` : type === 'ms' ? `/view-meeting-data?id=${id}` 
    : `/view-branding-data?id=${id}`

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

	if (err && err.status) {
        error(Number(err.status),err.message);
    }


    console.log('json viewed ',JSON.stringify(json));
	return {
		inputData: json
	};
};