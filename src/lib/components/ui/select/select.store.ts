import { writable } from 'svelte/store';

export const isOpen = writable(false);
export const searchQuery = writable('');
export const options = Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`);
export const filteredOptions = writable(options);
export const selectedOption = writable('');

export let dropdownPositionStyle = ''; // Inline style for dropdown position

export function toggleDropdown(setPosition: () => void) {
	isOpen.update((n) => !n);
	setTimeout(setPosition, 10); // Set position after the dropdown is rendered
}

export function closeDropdown() {
	isOpen.set(false);
}

export function filterOptions(searchQueryValue: string) {
	filteredOptions.set(
		options.filter((option) => option.toLowerCase().includes(searchQueryValue.toLowerCase()))
	);
}

export function setPosition(buttonRef: HTMLElement, dropdownRef: HTMLElement) {
	if (!dropdownRef || !buttonRef) return;
	const buttonRect = buttonRef.getBoundingClientRect();
	const viewportHeight = window.innerHeight;

	const spaceBelow = viewportHeight - buttonRect.bottom;
	const spaceAbove = buttonRect.top;

	// Calculate total space needed for dropdown (dropdown height + button height)
	const dropdownSpaceNeeded = dropdownRef.clientHeight + buttonRef.clientHeight;

	// Determine the position based on available space
	if (spaceBelow >= dropdownSpaceNeeded) {
		dropdownPositionStyle = `top: ${buttonRect.bottom}px`; // Place dropdown below the button
	} else if (spaceAbove >= dropdownSpaceNeeded) {
		dropdownPositionStyle = `bottom: ${viewportHeight - buttonRect.top}px`; // Place dropdown above the button
	} else {
		// Default to placing where there is more space
		dropdownPositionStyle =
			spaceAbove > spaceBelow
				? `bottom: ${viewportHeight - buttonRect.top}px`
				: `top: ${buttonRect.bottom}px`;
	}
}

export function selectOption(option: string) {
	selectedOption.set(option);
	closeDropdown();
}
