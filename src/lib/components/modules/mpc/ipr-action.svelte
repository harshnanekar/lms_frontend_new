<script lang="ts">

    import { ActionIcon } from '$lib/components/icons';

    import { Modal } from '$lib/components/ui';

    import type { IPRRender } from '$lib/types/modules/research/research-types';

    import { createEventDispatcher, onMount } from 'svelte';

    import { writable } from 'svelte/store';

    import type { ModalSizes } from '$lib/components/ui/modal/helper.modal';

    import { Popup } from '$lib/components/ui/popup';

    import { fetchApi } from '$lib/utils/fetcher';

    import { PUBLIC_API_BASE_URL } from '$env/static/public';

    import { toast } from 'svelte-sonner';

    import { goto } from '$app/navigation';

    import { paginateUrl } from '$lib/stores/modules/mpc/master.store';

    import { confirmStore, actionStore } from "$lib/stores/modules/mpc/master.store";

    import { showConfirmation } from '$lib/components/ui/popup';

    export let actionData: IPRRender;




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




    $: console.log('ACTIONDATA>>>>>>>>>>>', actionData);




    const isOpen = writable(false);

    let modalwidthPercent: ModalSizes = 'md';

    let journalId: number;




    const openModal = async () => {

        journalId = actionData.id;

        console.log('click called');

        const message = 'Are you sure you want to delete this?';

        confirmStore.set({

            isVisible: true,

            confirmText: message,

        });

        actionStore.set({

            callback: handleDelete,

        });

    };




    const closeModal = () => {

        isOpen.set(false);

    };




    async function handleDelete() {

        console.log('delete', journalId);

        isOpen.set(false);

        const { error, json } = await fetchApi({

            url: `${PUBLIC_API_BASE_URL}/ipr-delete?id=${journalId}`,

            method: 'GET',

        });




        if (error) {

            toast.error(error.message || 'Something went wrong!', {

                description: error.errorId ? `ERROR-ID: ${error.errorId}` : '',

            });

            return;

        }




        if (json.status == 200) {

            toast.success('Deleted Successfully!');

            let url: URL = new URL('http://localhost:9090/research/ipr-paginate');

            paginateUrl.set(url);

        } else {

            toast.error(json.message);

        }

    }

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

                <a

                    href="/ipr/view/{actionData.id}"

                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"

                    role="menuitem">View</a>

                <a

                    href="/ipr/edit/{actionData.id}"

                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"

                    role="menuitem">Edit</a>

                <button

                    on:click={openModal}

                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"

                    role="menuitem">Delete</button>

            </div>

        </div>

    {/if}

</div>




<Modal bind:isOpen={$isOpen} size={modalwidthPercent} on:close={closeModal}>

    <svelte:fragment slot="body">

        <div class="flex min-h-[10vh] flex-col justify-center p-4">

            <svg

                xmlns="http://www.w3.org/2000/svg"

                fill="none"

                color="currentColor"

                class="mx-auto mb-4 h-12 w-12 shrink-0 text-gray-400 dark:text-gray-200"

                role="img"

                aria-label="exclamation circle outline"

                viewBox="0 0 24 24"

            >

                <path

                    stroke="currentColor"

                    stroke-linecap="round"

                    stroke-linejoin="round"

                    stroke-width="2"

                    d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9z"

                />

            </svg>

            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">

                Delete IPR

            </h3>

            <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">

                Are you sure you want to delete this? This action cannot be undone.

            </p>

        </div>

    </svelte:fragment>

    <svelte:fragment slot="footer">

        <div class="flex w-full justify-between gap-4 p-4">

            <button

                class="btn btn-secondary w-full"

                on:click={() => {

                    closeModal();

                }}

            >

                Cancel

            </button>

            <button

                class="btn btn-primary w-full"

                on:click={handleDelete}

            >

                Confirm

            </button>

        </div>

    </svelte:fragment>

</Modal>




<style>

    .backdrop {

        position: fixed;

        inset: 0;

        background: rgba(0, 0, 0, 0.5);

    }

</style>