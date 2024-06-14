<script lang="ts">
	import { SortArrowIcon } from '$lib/components/icons';
	import { STATUS_COLORS } from '$lib/constants/colors';
	import type { TableHeaders, TableData } from './types';

	export let tableData: TableData[] = [];
	export let tableHeaders: TableHeaders[] = [];
	export let isAction = false;
</script>

<div class="lms-table-wrapper overflow-x-auto max-w-[100%]">
	<table class="lms-table">
		<thead>
			<tr>
				{#each tableHeaders as header}
					<th class="w-24">
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
							<td class="table-cell">
								{#if header.key === 'status'}
									<div
										class="{STATUS_COLORS[item['status_abbr'].toString().toLocaleLowerCase()]} no-bold"
									>
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
</div>

<style>
	.lms-table-wrapper::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	.lms-table-wrapper::-webkit-scrollbar {
		width: 5px;
		height: 10px;
		background-color: #f5f5f5;
	}

	.lms-table-wrapper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #777171;
	}
</style>
