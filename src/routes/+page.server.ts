import { PRIVATE_API_BASE_URL } from '$env/static/private';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { MeetingListItem } from '$lib/types/modules/mpc/master-form';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const { error, json } = await fetchApiServer<MeetingListItem[]>({
		url: `${PRIVATE_API_BASE_URL}/faculty/view-master-form-list`,
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
		masterFormList: json
	};
};
