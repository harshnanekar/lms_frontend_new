<script lang="ts">
	import { PUBLIC_BASE_URL } from "$env/static/public";

export let data : any;
let dashboard = data.dashboardData.length > 0 ? data.dashboardData : [];

console.log('admin dashboard ',JSON.stringify(data.dashboardData))

</script>

{#if dashboard.length > 0}
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  {#each dashboard as ds}
  <a href='{PUBLIC_BASE_URL}form-approval/{ds.id}'>
    <div class="p-8 border shadow-card rounded-2xl flex justify-center items-center">
      <p class="text-center">{ds.module_name}</p>
    </div>
  </a>
  {/each}
</div>
{:else}
<p>No Modules Found!</p>
{/if}