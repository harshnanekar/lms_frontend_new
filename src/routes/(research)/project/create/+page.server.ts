import type { PageServerLoad } from './$types';

import { PRIVATE_API_BASE_URL } from '$env/static/private';

import { fetchApiServer } from '$lib/server/utils/fetcher';

import { error, fail, redirect } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const { error : err, json } = await fetchApiServer({
		url: `${PRIVATE_API_BASE_URL}/research-project-render`,

		_fetch: fetch,

		cookies: cookies,

		method: 'GET'
	});

	if (err && err.status === 'UNAUTHORIZED') {
        redirect(303, `${PUBLIC_BASE_URL}login`);
    }

	if (err && err.status) {
        error(Number(err.status),err.message);
    }



	console.log('json ', json);

	return {
		ResearchProjectDataList: json
	};
};
