import type { Writable } from 'svelte/store';

export type ActiveSidebarModule = {
	module: string | null;
	label: string;
};

export type ActiveModuleContext = Writable<ActiveSidebarModule>;

export type SidebarListType =
	| {
			url: string;
			icon: string;
			label: string;
			module: null;
			child: never[];
	  }
	| {
			url: string;
			icon: string;
			label: string;
			module: string;
			child: {
				url: string;
				icon: string;
				label: string;
				module: string;
				child: never[];
			}[];
	  };
