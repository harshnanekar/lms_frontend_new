<script lang="ts">
	import { XIcon } from '$lib/components/icons';
	import { Image } from '$lib/components/ui';
	import { tooltip } from '$lib/utils/tooltip';

	type User = {
		userLid: number;
		name: string;
		username: string;
		email: string;
		avatar: string;
	};

	export let user: User;
	export let isClosable: boolean = false;
</script>

<div class="flex gap-x-5 items-center">
	<div>
		<Image src="https://via.placeholder.com/150" name={user.name} round width={32} height={32} />
	</div>
	<p class="m-0 p-0 text-label-lg">
		{user.name} ( {user.username} )
	</p>
	{#if isClosable}
		<button
			use:tooltip={{
				content: `<b class="text-primary">REMOVE</b> ${user.username}`
			}}
			on:click
			class="ml-auto"
		>
			<XIcon />
		</button>
	{/if}
</div>
