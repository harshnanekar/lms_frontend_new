export type ModalSizes = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPositions = 'top' | 'bottom' | 'center';

export const modalSizeMap = {
	sm: 'md:w-[20%]',
	md: 'md:w-[40%]',
	lg: 'md:w-[60%]',
	xl: 'md:w-[80%]',
	full: 'md:w-full'
};

export const modalPositionMap: Record<ModalPositions, string> = {
	top: 'items-start pt-10',
	bottom: 'items-end pb-10',
	center: 'items-center'
};
