<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { SearchIcon } from '$lib/components/icons';
	import type { Anchor, AnchorWithSelection } from '$lib/types/modules/mpc/master-form';
	import type { Filter } from '$lib/types/request.types';
	import { fetchApi } from '$lib/utils/fetcher';
	import UserList from './user-list.svelte';

	export let dependsOn: Filter[] = [];
	export let userList: AnchorWithSelection[] = [];

	type AnchorListResponse = {
		data: Anchor[];
		total: number;
		nextCursor: string;
	};

	$: {
		if (userList.length === 0 && dependsOn.length > 0 && dependsOn.every(({ value }) => value)) {
			const _url = new URL(PUBLIC_API_BASE_URL + '/faculty/getAttendees');

			dependsOn
				.filter((v) => v.value !== undefined)
				.forEach((filter) => {
					_url.searchParams.append(filter.key, String(filter.value));
				});
			_url.searchParams.append('limit', '10000');
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
						isSelected: true,
						isHidden: false
					};
				});
			});
		}
	}

	function handleToggle(user: AnchorWithSelection) {
		userList = userList.map((u) => {
			if (u.user_lid === user.user_lid) {
				u.isSelected = !u.isSelected;
				u.isHidden = false;
			}
			return u;
		});
	}

	$: count = userList.filter((u) => u.isSelected).length;

	function handleSearch(e: Event) {
		console.log("INSIDE SEARCH ATTENDEES>", userList);
		
		const target = e.target as HTMLInputElement;
		const value = target.value.toLowerCase().trim();
		userList = userList.map((user) => {
			user.isHidden =
				!user.full_name.toLowerCase().includes(value) &&
				!user.username.toLowerCase().includes(value);
			return user;
		});
	}
</script>

<div class="h-[65vh] xl:h-full rounded-xl bg-base p-4">
	<div class="flex items-center justify-between">
		<h2 class="text-body-1 font-bold">Add Attendees</h2>
		<p class="text-label-lg">{count} Added</p>
	</div>
	<div class="relative mt-4">
		<input
			class="lms-input rounded-full"
			type="text"
			placeholder="Search here..."
			on:input={handleSearch}
		/>
		<div class="absolute right-4 top-2.5">
			<SearchIcon />
		</div>
	</div>
	<div class="small-scrollbar absolute mt-8 h-[70%] w-[95%] space-y-3 overflow-y-auto">
		{#each userList.filter((v) => !v.isHidden) as user}
			<UserList
				{user}
				isClosable
				on:change={() => handleToggle(user)}
				bind:isSelected={user.isSelected}
			/>
		{/each}
	</div>
</div>
