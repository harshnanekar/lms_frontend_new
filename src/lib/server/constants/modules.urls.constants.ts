import { PRIVATE_API_BASE_URL } from "$env/static/private";

export const PRIVATE_MODULE_BASE_URL = {
    MPC: PRIVATE_API_BASE_URL + '/mpc/api/v1',
    AUTH : PRIVATE_API_BASE_URL + '/auth'
}