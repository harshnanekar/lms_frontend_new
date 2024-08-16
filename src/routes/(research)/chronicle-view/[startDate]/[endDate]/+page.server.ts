import { PRIVATE_API_BASE_URL, PRIVATE_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch,params }) => {
    
    const {startDate,endDate} = params;
	

	console.log('id and type ',startDate,endDate);

    
    const { error : err, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}/chronicle-view-datewise?startDate=${startDate}&endDate=${endDate}`,
		_fetch: fetch,
		cookies: cookies,
		method: 'GET'
	});

	if (err && err.status === 'UNAUTHORIZED') {
        redirect(303, `${PRIVATE_BASE_URL}login`);
    }

	if (err && err.status) {
        error(Number(err.status),err.message);
    }


    console.log('json viewed ',JSON.stringify(json));
	return {
		chronicleData: json
	};
};