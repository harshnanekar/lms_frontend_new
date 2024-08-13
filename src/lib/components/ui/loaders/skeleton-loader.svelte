<script>
	export let cardCount = 4;
</script>

{#each { length: cardCount } as item, i}
	<div
		class="mx-auto mt-3 flex w-full select-none flex-col gap-5 rounded-2xl bg-white p-2 shadow-lg sm:h-64 sm:flex-row sm:p-4"
	>
		<div class="h-52 animate-pulse rounded-xl bg-slate-50 sm:h-full sm:w-72"></div>
		<div class="flex flex-1 flex-col gap-5 sm:p-2">
			<div class="flex flex-1 flex-col gap-3">
				<div class="h-14 w-full animate-pulse rounded-2xl bg-slate-50"></div>
				<div class="h-3 w-full animate-pulse rounded-2xl bg-slate-50"></div>
				<div class="h-3 w-full animate-pulse rounded-2xl bg-slate-50"></div>
				<div class="h-3 w-full animate-pulse rounded-2xl bg-slate-50"></div>
				<div class="h-3 w-full animate-pulse rounded-2xl bg-slate-50"></div>
			</div>
			<div class="mt-auto flex gap-3">
				<div class="h-8 w-20 animate-pulse rounded-full bg-slate-50"></div>
				<div class="h-8 w-20 animate-pulse rounded-full bg-slate-50"></div>
				<div class="ml-auto h-8 w-20 animate-pulse rounded-full bg-slate-50"></div>
			</div>
		</div>
	</div>
{/each}
