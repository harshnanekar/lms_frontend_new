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

export const isSidebarOverlayOpen = writable(false);
