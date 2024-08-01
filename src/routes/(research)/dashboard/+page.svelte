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
    <div class="p-8 border shadow-card rounded-2xl grid grid-cols-1 place-items-center border-[#e5e9f1]">
      <div class="flex items-center">
          <svelte:component
              this={SIDEBAR_ICON[ds.icon]}
              fill="black"
              width={36}
              height={32}
          />
          <p class="text-center font-semibold ml-4">{ds.module_name}</p>
      </div>
  </div>
  </a>
  {/each}
</div>
{:else}
<p>No Modules Found!</p>
{/if}
