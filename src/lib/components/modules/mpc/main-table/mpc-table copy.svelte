<script lang="ts">
	import { SortArrowIcon } from '$lib/components/icons';
	import type { TableHeaders } from '$lib/types/layout/table';
	import { STATUS_COLORS } from '$lib/constants/colors';
	import type { MpcMasterList } from '$lib/types/modules/mpc';
	import { tooltip } from '$lib/utils/tooltip';
	import { MeetingAction } from '..';

	export let tableData: MpcMasterList[] = [];
	export let tableHeaders: TableHeaders<MpcMasterList>[] = [];

	let sort = {
		column: 'meeting_id',
		order: 'asc'
	};
</script>

<div class="lms-table-wrapper">
	<table class="lms-table">
		<thead>
			<tr>
				{#each tableHeaders as header}
					<th>
						<div class="flex">
							{header.label}
							{#if header.sortable}
								{@const sortOrder =
									sort.column === header.key ? (sort.order === 'asc' ? 'asc' : 'desc') : 'none'}
								<button>
									<SortArrowIcon {sortOrder} />
								</button>
							{/if}
						</div>
					</th>
				{/each}
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as item}
				<tr>
					{#each tableHeaders as header}
						<td
							use:tooltip={{
								content: header.showTooltip ? item[header.key] : ''
							}}
							class="table-cell {header.classes}"
						>
							{#if header.key === 'status'}
								<div
									class="{STATUS_COLORS[
										item['status_abbr'].toString().toLocaleLowerCase()
									]} no-bold whitespace-nowrap"
								>
									{item[header.key]}
								</div>
							{:else}
								{item[header.key]}
							{/if}
						</td>
					{/each}
					<td>
						<MeetingAction actionData={item} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
