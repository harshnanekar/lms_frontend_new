<script lang="ts">
	import { PaginateWithSlot } from '$lib/components/layout';
	import type { TableHeaders } from '$lib/types/layout/table';
	import { STATUS_COLORS } from '$lib/constants/colors';
	import { headers } from '$lib/test';
	import type { MpcMasterList } from '$lib/types/modules/mpc/master-form';
	import { tooltip } from '$lib/utils/tooltip';
	import { MeetingAction } from '..';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';

	let tableHeaders: TableHeaders<MpcMasterList>[] = headers;

	let url = new URL(`${PUBLIC_API_BASE_URL}/products`);
	let tableData: MpcMasterList[] = [];
</script>

<PaginateWithSlot
	showSearch={false}
	showPagination={true}
	bind:url
	header={headers}
	bind:tableData
	addLimit={true}
>
	{#each tableData as item}
		{tableData && JSON.stringify(item, null, 2)}
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
								item['status_abbr']?.toString().toLocaleLowerCase()
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
</PaginateWithSlot>
