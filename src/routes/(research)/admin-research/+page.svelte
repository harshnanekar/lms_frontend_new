<script lang="ts">
	import { PUBLIC_BASE_URL } from "$env/static/public";
	import { SIDEBAR_ICON } from "$lib/types/modules/research/research-types";
  import { COLORS } from '$lib/constants/colors';

export let data : any;
let dashboard = data.dashboardData ? data.dashboardData : [];

console.log('admin dashboard ',JSON.stringify(data.dashboardData))

let hoveredIndex: number | null = null;
function handleMouseEnter(index: number | null) {
    hoveredIndex = index;
  }

function handleMouseLeave() {
    hoveredIndex = null;
  }

</script>

{#if dashboard.length > 0}
<div class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-8">
  {#each dashboard as ds, index}
  
  <!-- {#if ds.abbr === 'bps'}
  <a href='{PUBLIC_BASE_URL}book-publications-approval' />
  {/if} -->
 
  <a href='{PUBLIC_BASE_URL}admin-research/{ds.id}'>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="cardcontent p-8 border shadow-card rounded-2xl flex items-center"
      on:mouseenter={() => handleMouseEnter(index)}
      on:mouseleave={handleMouseLeave}
    >
      <svelte:component
      this={SIDEBAR_ICON[ds.icon]}
      fill={hoveredIndex === index ? "red" : "black"}
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

<style>
  .cardcontent:hover {
    transform: scale(1.03);
    Transition: transform 300ms ease-in-out;
  }
  </style>