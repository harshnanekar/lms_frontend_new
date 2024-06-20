export type TableHeaders<T> = {
	key: keyof T;
	label: string;
	sortable?: boolean;
	sortDirection?: 'asc' | 'desc';
	classes?: string;
	showTooltip?: boolean;
};
