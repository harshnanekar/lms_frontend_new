import type { PageServerLoad } from "./$types";
import { PRIVATE_API_BASE_URL, PRIVATE_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch , params}) => {

	let id  = params.id;
	console.log("id>>>>>>>>>>>", id);
	
    const { error : err, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}vc-render-data?id=${id}`,
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



    console.log('json ',json);
	return {
		adminData: json,
		id
	};
};