import type { CustomOptions } from '$lib/components/ui/select/helper.select';

// a function to return previous year current year and next year
export function getAcadYear(): CustomOptions[] {
	const currentYear = new Date().getFullYear();
	return [
		{
			value: currentYear - 1,
			label: `${currentYear - 1}`
		},
		{
			value: currentYear,
			label: `${currentYear}`
		},
		{
			value: currentYear + 1,
			label: `${currentYear + 1}`
		}
	];
}
