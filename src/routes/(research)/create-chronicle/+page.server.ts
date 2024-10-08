import type { PageServerLoad } from './$types';
import { PRIVATE_API_BASE_URL, PRIVATE_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ChronicleModules } from '$lib/types/modules/research/research-types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const { error : err, json } = await fetchApiServer<ChronicleModules[]>({
		url: `${PRIVATE_API_BASE_URL}/create-chronicle-modules`,
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


	console.log('json ', json);
	return {
		json
	};
};
