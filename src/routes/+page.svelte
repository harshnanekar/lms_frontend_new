<script lang="ts">
	import Table from './../lib/components/ui/table/table.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import { headers, obj } from '$lib/test';
	import { ActionIcon, PlusIcon } from '$lib/components/icons';
	import TestComponents from '$lib/components/test.components.svelte';
	import { MPCMeetingCard, MPCTableFilters } from '$lib/components/modules';
	import { tooltip } from '@svelte-plugins/tooltips';

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

<div class="flex justify-between">
	<h1 class="text-lg font-bold md:text-xl">Multi Program Campus</h1>
	<button class="lms-primary-btn fixed bottom-16 right-5 py-4 md:static md:py-2.5">
		<PlusIcon />
		<span class="hidden md:block">Create New Meeting</span>
	</button>
</div>
<MPCTableFilters />
<h3 class="text-body-1 font-semibold">All Meetings</h3>
<Accordion collapse spaceBetween>
	{#each items as item, i}
		<AccordionItem open={items.length === 1}>
			<svelte:fragment slot="title">
				<div class="md:flex md:items-center md:justify-between">
					<div class="flex flex-col gap-x-2 md:flex-row md:items-center">
						<div
							use:tooltip={{
								content: item.title
							}}
							class="bold w-64 truncate text-left text-body-2 sm:w-[350px] md:w-[300px] 2xl:text-body-1"
						>
							{item.title}
						</div>
						<div
							use:tooltip={{
								content: item.title
							}}
							class="semi-bold w-48 truncate text-small-label md:w-64 2xl:text-label-md"
						>
							Master Of Business Administration (8001) - 50300366
						</div>
					</div>
					<div
						class="bold text-start text-small-label text-slate-100 sm:text-inherit 2xl:text-body-2"
					>
						{item.meeting_count} Meetings
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<div class="hidden md:block">
					<Table isAction tableData={obj} tableHeaders={headers} let:actionData>
						<button>
							<ActionIcon />
						</button>
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

<!-- <TestComponents /> -->
