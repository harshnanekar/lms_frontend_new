<div class="cursor-not-allowed space-y-4 rounded-xl p-4 lg:space-y-6">
	<!-- Title Skeleton -->
	<div class="space-y-2">
		<div class="bg-base h-4 animate-pulse rounded lg:h-6"></div>
		<div class="bg-base h-4 animate-pulse rounded lg:h-6"></div>
		<div class="bg-base h-4 w-3/4 animate-pulse rounded lg:h-6"></div>
	</div>

	<!-- Progress Bar Skeleton -->
	<div class="text-label-md flex items-center gap-x-3">
		<div class="bg-base h-4 w-10 animate-pulse rounded"></div>
		<div class="flex-1">
			<div class="bg-base h-4 animate-pulse rounded"></div>
		</div>
		<div class="bg-base h-4 w-10 animate-pulse rounded"></div>
	</div>

	<!-- Footer Skeleton -->
	<div class="text-label-md lg:text-label-lg flex items-center justify-between text-slate-100">
		<div class="bg-base h-4 w-32 animate-pulse rounded"></div>
		<div class="bg-base h-4 w-32 animate-pulse rounded"></div>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-6">
	{#each { length: 4 } as item}
		<div class="space-y-5 border p-4 rounded-xl">
			<div class="flex items-center justify-between">
				<div class="bg-base h-4 w-24 animate-pulse rounded"></div>
				<div class="w-50 bg-base h-4 animate-pulse rounded"></div>
			</div>
			<div class="bg-base h-4 w-[90%] animate-pulse rounded"></div>
            <div>
    			<div class="bg-base h-4 w-[30%] animate-pulse rounded"></div>
            </div>
            <div class="flex items-center gap-1">
    			<div class="bg-base h-8 w-8 animate-pulse rounded-full"></div>
    			<div class="bg-base h-8 w-8 animate-pulse rounded-full"></div>
    			<div class="bg-base h-8 w-8 animate-pulse rounded-full"></div>
                <div class="text-base ml-5 h-8 w-8 animate-pulse">...</div>
            </div>
		</div>
	{/each}
</div>
