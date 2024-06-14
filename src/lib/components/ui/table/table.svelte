<script lang="ts">
	import { SortArrowIcon } from '$lib/components/icons';
	import type { TableHeaders, TableData } from './types';

	export let tableData: TableData[] = [];
	export let tableHeaders: TableHeaders[] = [];
	export let isAction = false;

	let statusColors: { [key: string]: string } = {
		scheduled: 'lms-label-success',
		completed: 'lms-label-light',
		cancelled: 'lms-label-warning',
		'pending_forma': 'lms-label-info',
		'pending_formb': 'lms-label-info-b',
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
								<div class="{statusColors[item[header.key].toString().toLocaleLowerCase()]} no-bold">
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
