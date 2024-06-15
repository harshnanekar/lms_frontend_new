export type TableData = {
	[key: string]: string | number;
};

export type TableHeaders = {
	key: string;
	label: string;
	sortable?: boolean;
	sortDirection?: 'asc' | 'desc';
	classes?: string;
	showTooltip?: boolean;
};
