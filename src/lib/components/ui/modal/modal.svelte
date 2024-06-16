<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
	import { ModalSizeMap, type ModalSizes } from './types';
	import { fly } from 'svelte/transition';

  export let isOpen: boolean = false;
  export let size: ModalSizes = "md";

  const dispatch = createEventDispatcher();
  const closeModal = () => {
    isOpen = false;
    dispatch('close');
  };

  onMount(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });
</script>

<style>
  .modal-overlay {
    @apply fixed inset-0 bg-[#576173] bg-opacity-40 flex items-start pt-10 lg:pt-6 justify-center z-50;
  }
  .modal-content {
    @apply bg-white rounded-2xl shadow-modal overflow-hidden;
  }
</style>

{#if isOpen}
  <div transition:fly|local class="modal-overlay relative" on:click={closeModal}>
    <div
      class="modal-content w-full {ModalSizeMap[size]}"
      on:click|stopPropagation
    >
      <slot name="header">
        <div class="p-4 border-b relative">
          <h2 class="text-lg font-semibold">Modal Title</h2>
        </div>
      </slot>
      <slot name="body">
        <div class="p-4">
          <p>This is the modal body content.</p>
        </div>
      </slot>
      <slot name="footer"> 
      </slot>
    </div>
  </div>
{/if}
