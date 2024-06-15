<script>
	import { ActionIcon } from '$lib/components/icons';
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import { Table } from '$lib/components/ui/table';
	import { tooltip } from '$lib/utils/tooltip';
	import { MPCMeetingCard, MeetingAction } from '.';
	import { headers, obj } from '$lib/test';

	const items = [
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		},
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		},
		{
			title: 'Financial Analytics-I (803AN2E001)-52245092',
			meeting_count: 14,
			content: 'Content 1'
		}
	];
</script>

<Accordion collapse spaceBetween>
	{#each items as item, i}
		<AccordionItem open={items.length === 1}>
			<svelte:fragment slot="title">
				<div class="md:flex md:items-center md:justify-between">
					<div class="flex flex-row items-center space-x-2">
						<!-- use:tooltip={{ content: item.title }} -->
						<div
							class="bold flex-shrink-0 truncate text-left text-body-2 sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px] 2xl:text-body-1"
						>
							{item.title}
						</div>
						<!-- use:tooltip={{ content: item.title }} -->
						<div
							class="semi-bold flex-shrink-0 truncate text-small-label sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px] 2xl:text-label-md"
						>
							Master Of Business Administration (8001) - 50300366
						</div>
					</div>
					<div
						class="bold text-start text-small-label text-slate-100 sm:text-inherit 2xl:text-body-2"
					>
						{item.meeting_count} Meetings
					</div>
				</div></svelte:fragment
			>
			<svelte:fragment slot="content">
				<div class="hidden md:block">
					<Table isAction tableData={obj} tableHeaders={headers} let:actionData>
						<MeetingAction {actionData} />
					</Table>
				</div>
				<div class="space-y-4 divide-y-2 md:hidden">
					{#each obj as item}
						<MPCMeetingCard {item} />
					{/each}
				</div>
			</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>
