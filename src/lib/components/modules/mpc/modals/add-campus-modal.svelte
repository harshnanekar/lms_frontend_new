<script>
	import { SearchIcon } from '$lib/components/icons';
	import { UserList } from '$lib/components/layout';
	import { DynamicSelect, Modal } from '$lib/components/ui';

	export let isModalOpen = false;
</script>

<Modal isOpen={isModalOpen} closeOnOutsideClick={false} size="xl" position="top-bottom">
	<svelte:fragment slot="body">
		<div class="grid grid-cols-1 xl:grid-cols-3 min-h-[65vh] p-6 gap-6 overflow-y-auto">
			<div class="relative">
				<div class="grid grid-cols-1 gap-y-6">
					<h2 class="text-heading-2.5 font-bold">Add Campus</h2>
					<DynamicSelect placeholder="Campus" />
					<DynamicSelect placeholder="Program" />
					<DynamicSelect placeholder="Academic Select" />
					<DynamicSelect placeholder="Course" />
				</div>
				<div class="absolute bottom-3 flex">
					<button class="lms-btn px-16" on:click={() => (isModalOpen = !isModalOpen)}>
						Cancel
					</button>
					<button class="lms-btn lms-primary-btn px-16"> ADD </button>
				</div>
			</div>
			<div>
				<div class="p-4 border border-slate-250 rounded-xl">
					<div class="flex justify-between items-center">
						<h2 class="font-bold text-body-1">Add Program Anchor</h2>
						<p class="text-label-lg">2 Added</p>
					</div>
					<div class="relative mt-4">
						<input class="lms-input rounded-full" type="text" placeholder="Search here..." />
						<div class="absolute right-4 top-2.5">
							<SearchIcon />
						</div>
					</div>
					<div class="h-[20vh] overflow-y-auto small-scrollbar space-y-3 mt-4">
						{#each { length: 2 } as item}
							<UserList
								user={{ userLid: 1, name: 'John Doe', username: '32200039', email: '', avatar: '' }}
								on:click={() => console.log('clicked')}
								isClosable
							/>
						{/each}
					</div>
				</div>
				<div class="mt-4 p-4 border border-slate-250 rounded-xl">
					<div class="flex justify-between items-center">
						<h2 class="font-bold text-body-1">Add Course Anchor</h2>
						<p class="text-label-lg">2 Added</p>
					</div>
					<div class="relative mt-4">
						<input class="lms-input rounded-full" type="text" placeholder="Search here..." />
						<div class="absolute right-4 top-2.5">
							<SearchIcon />
						</div>
					</div>
					<div class="h-[20vh] overflow-y-auto small-scrollbar"></div>
				</div>
			</div>
			<div>
				<div class="rounded-xl bg-base h-full p-4">
					<div class="flex justify-between items-center">
						<h2 class="font-bold text-body-1">Add Attendees</h2>
						<p class="text-label-lg">2 Added</p>
					</div>
					<div class="relative mt-4">
						<input class="lms-input rounded-full" type="text" placeholder="Search here..." />
						<div class="absolute right-4 top-2.5">
							<SearchIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
</Modal>
