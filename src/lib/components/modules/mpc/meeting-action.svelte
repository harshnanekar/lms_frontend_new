<script lang="ts">
	// import { JournalView } from '$lib/types/modules/research/research-types.ts';
	import { ActionIcon } from '$lib/components/icons';
	// import type { SubjectMeetingDetail } from '$lib/types/modules/mpc/master-form';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// export let actionData: SubjectMeetingDetail;
	const showMenu = writable<boolean>(false);
	const menuPosition = writable<{ top: number; left: number }>({ top: 0, left: 0 });

	let buttonElement: HTMLButtonElement;
	let menuElement: HTMLDivElement;

	const toggleMenu = () => {
		showMenu.update((value) => !value);
	};

	$: if ($showMenu && menuElement) {
		const rect = buttonElement.getBoundingClientRect();
		const menuRect = menuElement.getBoundingClientRect();

		let top = rect.bottom + window.scrollY;
		let left = rect.left + window.scrollX;

		// Check for available space below the button
		if (window.innerHeight - rect.bottom < menuRect.height) {
			top = rect.top + window.scrollY - menuRect.height;
		}

		// Check for available space to the right of the button
		if (window.innerWidth - rect.left < menuRect.width) {
			left = rect.right + window.scrollX - menuRect.width;
		}

		// Check for available space to the left of the button
		if (rect.left < menuRect.width) {
			left = rect.left + window.scrollX;
		}

		menuPosition.set({ top, left });
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			!buttonElement.contains(event.target as Node) &&
			(!menuElement || !menuElement.contains(event.target as Node))
		) {
			showMenu.set(false);
		}
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div>
	<button class="action-button" bind:this={buttonElement} on:click={toggleMenu}>
		<ActionIcon />
	</button>
	{#if $showMenu}
		<div role="presentation" class="backdrop" on:click={handleClickOutside}></div>
		<div
			bind:this={menuElement}
			class="fixed-menu mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
			style="top: {$menuPosition.top}px; left: {$menuPosition.left}px;"
		>
			<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
				<button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
					>View</button
				>
				<button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
					>Edit</button
				>
				<!-- <button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
					>Delete ({actionData.meeting_name})</button
				> -->
					<button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
					>Delete</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.fixed-menu {
		position: fixed;
		z-index: 90000000;
	}
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9000000;
		transition: background 5000ms ease;
	}
</style>
