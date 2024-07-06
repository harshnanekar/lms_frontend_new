<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
	import {confirmStore} from "$lib/stores/modules/mpc/master.store"
 
	 let resolveFunc: (value: boolean) => void;
	 const isOpen = writable(false);
	 let modalwidthPercent: ModalSizes = 'sm';
	 let journalId: number;

	//  confirmStore.set({
	// 		 isVisible: true,
	// 		 confirmText: 'Are you sure?'
	// 	 });
 
	// console.log($confirmStore)
 
	 function handleYesClick() {
		 confirmStore.set({
			 isVisible: false,
			 confirmText: 'Are you sure?'
		 });
		 isOpen.set(true);
		 resolveFunc(true);
	 }
 
	 function handleNoClick() {
		 confirmStore.set({
			 isVisible: false,
			 confirmText: 'Are you sure?'
		 });
		 resolveFunc(false);
		 isOpen.set(false);
 
	 }
 
 
	 
 
 </script>
 
 {#if $confirmStore.isVisible}
 <Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={handleNoClick}>
	
	<svalte:fragment slot="body">
		<div class=" flex min-h-[10vh] flex-col justify-center p-4">
			<i class="fa-solid fa-trash text-red"></i>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				{@html $confirmStore.confirmText ?? 'Are you Sure?'}
			</h3>
		</div>
	</svalte:fragment>
	<div slot="footer">
		<div class="flex flex-row justify-center gap-4 border-t p-4">
			<button class="lms-btn lms-primary-btn" on:click={handleYesClick}>Yes, I'm sure</button>
			<button class="lms-btn lms-secondary-btn" on:click={handleNoClick}>No, cancel</button>
		</div>
	</div>
</Modal>
 {/if}
 