import type { PageServerLoad } from "./$types";
import { PRIVATE_API_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { fail } from '@sveltejs/kit';
import type { MasterMeetingStore } from '$lib/types/modules/mpc/master-form';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
    const id = params.id;
    const { error, json } = await fetchApiServer<MasterMeetingStore>({
		url: `${PRIVATE_API_BASE_URL}/faculty/view-master-form?id=${id}`,
		_fetch: fetch,
		cookies: cookies,
		method: 'GET'
	});

	if (error) {
		fail(500, {
			message: error.message
		});
	}

	return {
		masterForm: json
	};
};