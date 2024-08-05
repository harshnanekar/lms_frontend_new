<script lang="ts">
	import { ApprovalIcon, OpenBookIcon, ScheduledIcon } from "$lib/components/icons";
	import RightIcon from "$lib/components/icons/base/right-icon.svelte";
	import XIcon from "$lib/components/icons/base/x-icon.svelte";

export let status : string = "pd";
export let inputClass = '';

</script>

{#if status === 'pd'}
<div class="lms-label lms-label-light font-bold {inputClass} flex items-center gap-2 py-1">
<ScheduledIcon />
Pending
</div>
{:else if status === 'cp'}
<div class="lms-label lms-label-success font-bold {inputClass} flex items-center gap-2 py-1">
   <RightIcon />
    Approved
</div>
{:else}
<div class="lms-label lms-label-warning font-bold {inputClass} flex items-center gap-2 py-1">
    <XIcon />
    Rejected
</div>
{/if}