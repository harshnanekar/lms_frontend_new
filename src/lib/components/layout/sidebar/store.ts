import { writable } from 'svelte/store';
import type { SidebarListType } from './types';

export const activeSidebarModule = writable<SidebarListType>({
	module: null,
	label: '',
	icon: '',
	url: '',
	child: []
});
