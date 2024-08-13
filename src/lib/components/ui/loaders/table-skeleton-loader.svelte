<script>
	export let rows = 3;
	export let columns = 4;
  </script>
  
  <div class="mx-auto mt-3 w-full select-none flex-col gap-5 rounded-2xl bg-white p-2 shadow-lg">
	<!-- Table Header -->
	<div class="flex animate-pulse mb-3">
	  {#each Array(columns) as _, i}
		<div class="h-6 w-full rounded-xl bg-slate-50 {i > 0 ? 'ml-2' : ''}"></div>
	  {/each}
	</div>
	<!-- Table Rows -->
	{#each Array(rows) as _}
	  <div class="flex animate-pulse mb-3">
		{#each Array(columns) as _, i}
		  <div class="h-6 w-full rounded-xl bg-slate-50 {i > 0 ? 'ml-2' : ''}"></div>
		{/each}
	  </div>
	{/each}
  </div>
  
  <style>
	.ml-2 {
	  margin-left: 0.5rem;
	}
  </style>
  