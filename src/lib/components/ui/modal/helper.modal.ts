export type ModalSizes = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid';
export type ModalPositions =
	| 'top-top'
	| 'top-bottom'
	| 'top-center'
	| 'bottom-top'
	| 'bottom-bottom'
	| 'bottom-center'
	| 'center-top'
	| 'center-bottom'
	| 'center-center';

export const modalSizeMap = {
	sm: 'w-full md:w-[20%]',
	md: 'w-full md:w-[40%]',
	lg: 'w-full md:w-[60%]',
	xl: 'w-full md:w-[80%]',
	full: 'w-full md:w-full',
	fluid: 'w-full md:w-fit'
};

export const modalPositionClasses: Record<ModalPositions, string> = {
	'top-top': 'md:items-start md:pt-10 items-start pt-10',
	'top-bottom': 'md:items-start items-end pt-10 md:pb-0',
	'top-center': 'md:items-start md:pt-10 items-center pt-0',
	'bottom-top': 'me:items-end items-start pt-0',
	'bottom-bottom': 'md:items-end tems-end pb-0',
	'bottom-center': 'md:items-end items-center pb-0',
	'center-top': 'md:items-center items-start pt-10 md:pt-0',
	'center-bottom': 'md:items-center items-end pb-0',
	'center-center': 'items-center'
};
