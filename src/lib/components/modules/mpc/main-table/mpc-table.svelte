<script lang="ts">
	import type { TableHeaders } from '$lib/types/layout/table';
	import { STATUS_COLORS } from '$lib/constants/colors';
	import { headers } from '$lib/test';
	import type { SubjectMeetingDetail } from '$lib/types/modules/mpc/master-form';
	import { tooltip } from '$lib/utils/tooltip';
	import { MeetingAction } from '..';
	import { PaginateClient } from '$lib/components/layout/pagination';

	let tableHeaders: TableHeaders<SubjectMeetingDetail>[] = headers;

	export let tableData: SubjectMeetingDetail[] = [];
</script>

<PaginateClient
	showSearch={false}
	showPagination={false}
	header={headers}
	bind:tableData
	addLimit={true}
>
	{#each tableData as item}
		<tr>
			{#each tableHeaders as header}
				<td
					use:tooltip={{
						content: header.showTooltip ? item[header.key]?.toString() : ''
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
						<div class="description">
							{item[header.key]}
						</div>
					{/if}
				</td>
			{/each}
			<td>
				<MeetingAction actionData={item} />
			</td>
		</tr>
	{/each}
</PaginateClient>
