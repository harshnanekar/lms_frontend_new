<script lang="ts">
	import { Header } from '$lib/components/researchHeader';
	import { writable } from 'svelte/store';
	import { Modal } from '$lib/components/ui';
	import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';
	import { confirmStore,actionStore } from '$lib/stores/modules/mpc/master.store';
	const isOpen = writable(true);
	let modalwidthPercent: ModalSizes = 'sm';



	function handleYesClick() {

	  confirmStore.set({
		isVisible: false,
		confirmText: 'Are you sure?'
	  });
	  isOpen.set(false);

	  actionStore.update(store => {
            if (store.callback) {
                store.callback();
            }
            return store;
        });
	}
  
	function handleNoClick() {
	  confirmStore.set({
		isVisible: false,
		confirmText: 'Are you sure?'
	  });
	  isOpen.set(false);
	}

	let value = $confirmStore;
	console.log(value)
  </script>
  
  {#if $confirmStore.isVisible}
  <Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={handleNoClick}>
	<div class="text-center p-6" slot="body">
	  <i class="fa-solid fa-trash text-primary text-[30px]"></i>
	  <h3 class="mb-5 text-lg font-normal font-semibold text-gray-500 dark:text-gray-400 mt-2">
		{@html $confirmStore.confirmText ?? 'Are you Sure?'}
		</h3>
	<div class="flex flex-row justify-center mt-4 gap-4">
	  <button class="lms-btn lms-primary-btn" on:click={handleYesClick}>Yes, I'm sure</button>
	  <button class="lms-btn lms-secondary-btn" on:click={handleNoClick}>No, cancel</button>
	</div>	
	</div>

  </Modal>
  {/if}
  