<script lang="ts">
	import { SIDEBAR_ICON } from '$lib/types/modules/research/research-types';
	import { COLORS } from '$lib/constants/colors';

export let data : any;
let dashboard = data.dashboardData.length > 0 ? data.dashboardData : [];
console.log('dashboard modules ',JSON.stringify(data.dashboardData))

</script>

{#if dashboard.length > 0}
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  {#each dashboard as ds}
  <a href={ds.url}>
    <div class="p-8 border shadow-card rounded-2xl flex justify-center items-center space-x-2 border-[#e5e9f1]">
        <svelte:component
		this={SIDEBAR_ICON[ds.icon]}
		fill="black"
		width={36}
		height={32}
		/>
      <p class="text-center font-semibold">{ds.module_name}</p>
    </div>
  </a>
  {/each}
</div>
{:else}
<p>No Modules Found!</p>
{/if}
