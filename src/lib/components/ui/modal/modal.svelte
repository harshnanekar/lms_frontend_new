<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let isOpen: boolean = false;
  export let widthPercentage: number = 50;

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
    @apply fixed inset-0 bg-[#576173] bg-opacity-40 flex items-start pt-6 justify-center z-50;
  }
  .modal-content {
    @apply bg-white rounded-2xl shadow-modal overflow-hidden;
  }
</style>

{#if isOpen}
  <div class="modal-overlay relative" on:click={closeModal}>
    <div
      class="modal-content"
      on:click|stopPropagation
      style="min-width: {widthPercentage}%"
    >
      <slot name="header">
        <div class="p-4 border-b relative">
          <h2 class="text-lg font-semibold">Modal Title</h2>
          <button class="absolute top-2 right-2" on:click={closeModal}>✕</button>
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
