<script lang="ts">
	import { PlusIcon } from '$lib/components/icons';
	import Input from '$lib/components/ui/input/input.svelte';
	export let binded : any ;
    export let binder : any
</script>    

<Input 
bind:value={binded}
placeholder="Select"
/>

<Input 
bind:value={binder}
placeholder="Select"
/>
