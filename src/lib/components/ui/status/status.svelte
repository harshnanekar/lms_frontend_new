<script lang="ts">
	import { OpenBookIcon, ScheduledIcon } from "$lib/components/icons";
	import XIcon from "$lib/components/icons/base/x-icon.svelte";

export let status : string = "pd";

</script>

{#if status === 'pd'}
<div class="lms-label lms-label-light font-bold mt-4 flex items-center gap-2 py-1">
<ScheduledIcon />
Pending
</div>
{:else if status === 'cp'}
<div class="lms-label lms-label-success font-bold mt-4 flex items-center gap-2 py-1">
    <OpenBookIcon />
    Completed
</div>
{:else}
<div class="lms-label lms-label-warning font-bold mt-4 flex items-center gap-2 py-1">
    <XIcon />
    Rejected
</div>
{/if}