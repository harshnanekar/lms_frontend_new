import type { PageServerLoad } from "./$types";
import { PRIVATE_API_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch , params}) => {

	let id  = params.id;
    const { error, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}/admin-render-data?id=${id}`,
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
		adminData: json
	};
};