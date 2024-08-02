<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { Modal } from '../modal';
	// import { HalfShieldIcon } from '$lib/components/icons';
	// import { AnimationPlayer } from '$lib/components/layout';

	let resolveFunc: (value: boolean) => void;

	export const confirmStore = writable({
		isVisible: false,
		confirmText: 'Are you sure?',
		confirmButtonText: "Yes, I'm sure",
		cancelButtonText: 'No, cancel',
		icon: ''
	});

	export function showConfirmation(
		confirmText = 'Are you sure?',
		confirmButtonText = "Yes, I'm sure",
		cancelButtonText = 'No, cancel',
		icon = ''
	): Promise<boolean> {
		confirmStore.set({
			isVisible: true,
			confirmText,
			confirmButtonText,
			cancelButtonText,
			icon
		});

		return new Promise<boolean>((resolve) => {
			resolveFunc = resolve;
		});
	}

	function handleYesClick() {
		confirmStore.set({
			isVisible: false,
			confirmText: 'Are you sure?',
			confirmButtonText: "Yes, I'm sure",
			cancelButtonText: 'No, cancel',
			icon: ''
		});
		resolveFunc(true);
	}

	function handleNoClick() {
		confirmStore.set({
			isVisible: false,
			confirmText: 'Are you sure?',
			confirmButtonText: "Yes, I'm sure",
			cancelButtonText: 'No, cancel',
			icon: ''
		});
		resolveFunc(false);
	}
</script>

<Modal
	bind:isOpen={$confirmStore.isVisible}
	size="fluid"
	closeOnOutsideClick={false}
	on:close={handleNoClick}
>
	<svelte:fragment slot="body">
		<div class="p-10 text-center">
			<div class="mx-auto w-fit">
				<!-- {#if $confirmStore.icon === ''}
					<HalfShieldIcon width={40} height={40} />
				{:else}
					<AnimationPlayer width={150} height={80} src={$confirmStore.icon} />
					<img src={$confirmStore.icon} alt="" />
				{/if} -->
			</div>
			<h3 class="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				{@html $confirmStore.confirmText ?? 'Are you Sure?'}
			</h3>
			<div class="mt-4 flex justify-center">
				<button class="lms-btn lms-primary-btn mr-2" on:click={handleYesClick}>
					{@html $confirmStore.confirmButtonText}
				</button>
				<button class="lms-btn lms-secondary-btn" on:click={handleNoClick}>
					{@html $confirmStore.cancelButtonText}
				</button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
