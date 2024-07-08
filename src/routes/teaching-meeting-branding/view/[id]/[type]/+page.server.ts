import { PRIVATE_API_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch,params }) => {
    
    const {id,type} = params;
	
    const moduleUrl = type === 'te' ? '/view-teaching-data' : type === 'ms' ? '/view-meeting-data' 
    : '/view-branding-data'

	console.log('id and type ',id,type,moduleUrl);

    
    const { error, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}${moduleUrl}`,
		_fetch: fetch,
		cookies: cookies,
		method: 'GET'
	});

	if (error) {
		fail(500, {
			message: error.message
		});
	}

    console.log('json ',json);
	return {
		inputData: json
	};
};