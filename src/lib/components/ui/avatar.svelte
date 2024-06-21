<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	export let src: string;
	export let name: string;
</script>

<Avatar.Root class="h-10 w-10 bg-blue-400 text-white">
	<Avatar.Image {src} alt="avatar" class="h-10 w-10 rounded-full border-2 border-white" />
	<Avatar.Fallback class="h-10 w-10 rounded-full border-2 border-white"
		>{name.charAt(0).toUpperCase()}</Avatar.Fallback
	>
</Avatar.Root>
