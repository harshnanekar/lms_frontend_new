import { PRIVATE_MODULE_BASE_URL } from '$lib/server/constants/modules.urls.constants';
import { fetchApiServer } from '$lib/server/utils/fetcher';
import { error, redirect, type NumericRange } from '@sveltejs/kit';
import type { UserSessionData } from '$lib/types/user';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
    const { json, error: err } = await fetchApiServer<UserSessionData>({
        url: `${PRIVATE_MODULE_BASE_URL.AUTH}/validate-route`,
        method: 'GET',
        body: null,
        cookies,
        _fetch: fetch
    });

    console.log("json>>>>>>>", json);
    console.log("error>>>>>>", err)
    

    if (err && err.status === 'UNAUTHORIZED') {
        redirect(303, '/login');
    }

    if (err) {
        error((Number(err.status) as NumericRange<400, 599>) ?? 500, {
            message: err.message ?? 'Something went wrong'
        });
    }
    
    if(!json) {
        error(500, {
            message: "Internal Server Error"
        })
    }

    return {
        json
    };
};