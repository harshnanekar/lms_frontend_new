<script lang="ts">
	import { Image, Toggle } from '$lib/components/ui';
	import type { Anchor } from '$lib/types/modules/mpc/master-form';

	export let user: Anchor;
	export let isClosable: boolean = false;
	export let isSelected: boolean = false;
</script>

<div class="flex items-center gap-x-5 rounded-xl p-2" class:shadow-lg={isClosable && !isSelected}>
	<div>
		<Image
			src="https://via.placeholder.com/150"
			name={user.full_name}
			round
			width={32}
			height={32}
		/>
	</div>
	<p class="m-0 p-0 text-label-lg">
		{user.full_name} ( {user.username} )
	</p>
	{#if isClosable}
		<div class="ml-auto">
			<Toggle on:change isTrue={isSelected} />
		</div>
	{/if}
</div>
