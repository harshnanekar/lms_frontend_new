<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import type { Anchor, AnchorWithSelection } from '$lib/types/modules/mpc/master-form';
	import type { Filter } from '$lib/types/request.types';
	import { fetchApi } from '$lib/utils/fetcher';
	import UserList from './user-list.svelte';

	export let type: 'program' | 'course' = 'program';
	export let dependsOn: Filter[] = [];
	export let userList: AnchorWithSelection[] = [];

	const url = type === 'program' ? 'faculty/getProgramAnchor' : 'faculty/getCourseAnchor';

	type AnchorListResponse = {
		data: Anchor[];
		total: number;
		nextCursor: string;
	};

	$: {
		if (userList.length === 0 && dependsOn.length > 0 && dependsOn.every(({ value }) => value)) {
			const _url = new URL(PUBLIC_API_BASE_URL + '/' + url);

			dependsOn
				.filter((v) => v.value !== undefined)
				.forEach((filter) => {
					_url.searchParams.append(filter.key, String(filter.value));
				});

			fetchApi<AnchorListResponse>({
				url: _url.href,
				method: 'GET'
			}).then((res) => {
				if (res.error) {
					// TODO: Alert error
					alert('error>>>');
					return;
				}

				userList = (res.json as any).data.map((user : any) => {
					return {
						...user,
						isSelected: true
					};
				});
			});
		}
	}

	function handleToggle(user: AnchorWithSelection) {
		userList = userList.map((u) => {
			if (u.user_lid === user.user_lid) {
				u.isSelected = !u.isSelected;
			}
			return u;
		});
	}

	$: count = userList.filter((u) => u.isSelected).length;
</script>

<div class="mx-auto rounded-xl border border-slate-250 p-4">
	<div class="flex items-center justify-between">
		<h2 class="text-body-1 font-bold">Add {type === 'course' ? 'Course' : 'Program'} Anchor</h2>
		<p class="text-label-lg">{count} Added</p>
	</div>
	<!-- <div class="relative mt-4">
		<input on:input={handleSearch} class="lms-input rounded-full" type="text" placeholder="Search here..." />
		<div class="absolute right-4 top-2.5">
			<SearchIcon />
		</div>
	</div> -->
	<div class="small-scrollbar mt-8 h-[20vh] space-y-3 overflow-y-auto">
		{#each userList as user}
			<UserList
				{user}
				isClosable
				on:change={() => handleToggle(user)}
				bind:isSelected={user.isSelected}
			/>
		{/each}
	</div>
</div>
