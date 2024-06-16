import { writable } from 'svelte/store';
import type { SidebarListType } from './types';

export const activeSidebarModule = writable<SidebarListType>({
	module: null,
	label: '',
	icon: '',
	url: '',
	child: []
});

export const setActiveSidebarUrl = (url: string | undefined, sidebarList: SidebarListType[]) => {
	for (let sidebar of sidebarList) {
		console.log('inside>', sidebar, url);

		if (sidebar.url === url) {
			activeSidebarModule.set(sidebar);
			return;
		}

		if (sidebar.child.length > 0) {
			const activeChild = sidebar.child.find((child) => child.url === url);
			if (activeChild) {
				activeSidebarModule.set(sidebar);
				return;
			}
		}
	}
};
