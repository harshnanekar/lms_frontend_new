import type { PageServerLoad } from "./$types";
import { PRIVATE_API_BASE_URL, PRIVATE_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
    const { error : err, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}/research-award-render-data`,
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


    console.log('json ',json);
	return {
		researchAwardData: json
	};
};