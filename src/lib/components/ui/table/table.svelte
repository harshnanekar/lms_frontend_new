<script lang="ts">
	import { SortArrowIcon } from '$lib/components/icons';
	import type { TableHeaders, TableData } from './types';

	export let tableData: TableData[] = [];
	export let tableHeaders: TableHeaders[] = [];
	export let isAction = false;

	let statusColors: { [key: string]: string } = {
		scheduled: 'bg-blue-100 text-blue-800 py-1 px-20 rounded-full w-fit',
		completed: 'bg-green-100 text-green-800 p-1 rounded-full w-fit',
		cancelled: 'bg-red-100 text-red-800 p-1 rounded-full w-fit',
		postponed: 'bg-yellow-100 text-yellow-800 p-1 rounded-full w-fit'
	};
</script>

<table class="lms-table">
	<thead>
		<tr>
			{#each tableHeaders as header}
				<th>
					<div class="flex">
						{header.label}

						{#if header.sortable}
							<button>
								<SortArrowIcon />
							</button>
						{/if}
					</div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each tableData as item}
			<tr>
				{#each tableHeaders as header}
					{#if isAction && header.key !== 'action'}
						<td>
							{#if header.key === 'status'}
								<div class={statusColors[item[header.key].toString().toLocaleLowerCase()]}>
									{item[header.key]}
								</div>
							{:else}
								<div
									class={header.key.includes('id')
										? 'bg-base w-fit rounded-lg px-4 py-2 table-alternalte-text'
										: ''}
								>
									{item[header.key]}
								</div>
							{/if}
						</td>
					{/if}
				{/each}
				{#if isAction}
					<td>
						<slot actionData={item}></slot>
					</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
