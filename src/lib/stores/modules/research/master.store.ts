import type { CustomOptions } from "$lib/components/ui/select/helper.select";
import { writable } from "svelte/store";
import { any, number, unknown } from "zod";

let url =new URL("http://localhost:9090/research");
export const paginateUrl = writable<URL>(url);

let meeturl =new URL("http://localhost:9090/research");
export const meetPaginateUrl = writable<URL>(meeturl);

let brandurl = new URL("http://localhost:9090/research");
export const brandPaginateUrl = writable<URL>(brandurl);

export const confirmStore = writable<{ isVisible: boolean, confirmText: string }>({
	isVisible: false,
	confirmText: 'Are you sure?'
});

export const optionStore = writable<CustomOptions>({
	value : null,
	label : null
});


export type ActionStore = {
    callback?: () => void;
}

export const actionStore = writable<ActionStore>({});

export const fileDataStore = writable([{name : String , url : URL , id : number}]);