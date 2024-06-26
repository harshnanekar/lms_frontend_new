<script lang="ts">
	import { PlusIcon } from '$lib/components/icons';
    export let header : string = '';
	
	function openForm(){
    console.log('form modal clicked');
    }
</script>    

<!-- svelte-ignore missing-declaration -->
	<h1 class="text-lg font-bold md:text-xl">{header}</h1>
	
