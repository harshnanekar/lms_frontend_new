<script lang="ts">
	import { SIDEBAR_ICON } from "$lib/types/modules/research/research-types";

export let data:any;
console.log('modules ',JSON.stringify(data))

let dashboard = data.dashboardData ? data.dashboardData : []
</script>


{#if dashboard.length > 0}
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  {#each dashboard as ds}
  <a href={ds.url}>
      <div class="p-8 border shadow-card rounded-2xl flex items-center">
          <svelte:component
              this={SIDEBAR_ICON[ds.icon]}
              fill="black"
              width={36}
              height={32}
          />
          <p class="text-center font-semibold ml-4">{ds.module_name}</p>
      </div>
  </a>
  {/each}
</div>
{:else}
<p>No Modules Found!</p>
{/if}
