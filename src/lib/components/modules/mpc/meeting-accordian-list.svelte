<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import { MPCMeetingCard, MpcTable } from '.';
	import { obj } from '$lib/test';
	import { tooltip } from '$lib/utils/tooltip';
	import type { MeetingListItem } from '$lib/types/modules/mpc/master-form';

	export let masterFormList: MeetingListItem[] | null;
</script>

{#if masterFormList}
	<Accordion collapse spaceBetween>
		{#each masterFormList as item}
			<AccordionItem>
				<svelte:fragment slot="title">
					<div class="md:flex md:items-center md:justify-between">
						<div class="lg:flex lg:items-center lg:space-x-2">
							<!-- use:tooltip={{ content: item.title }} -->
							<div
								use:tooltip={{ content: item.program_name }}
								class="bold text-body-2 2xl:text-body-1 max-w-[250px] flex-shrink-0 truncate text-left lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px]"
							>
								{item.program_name}
							</div>
							<!-- use:tooltip={{ content: item.title }} -->
							<div
								use:tooltip={{ content: item.subject_name }}
								class="semi-bold text-small-label 2xl:text-label-md max-w-[250px] flex-shrink-0 truncate text-left xl:max-w-[350px] 2xl:max-w-[450px]"
							>
								{item.subject_name}
							</div>
						</div>
						<div
							class="bold text-small-label 2xl:text-body-2 text-start text-slate-100 sm:text-inherit"
						>
							{item.subject_meeting_details.length} Meetings
						</div>
					</div></svelte:fragment
				>
				<svelte:fragment slot="content" let:open>
					{#if open}
						<div class="hidden md:block">
							<MpcTable tableData={item.subject_meeting_details} />
						</div>
						<div class="space-y-4 divide-y-2 md:hidden">
							{#each item.subject_meeting_details as data, i}
								<MPCMeetingCard item={data} />
							{/each}
						</div>
						<div id="scroll-anchor" style="height: 1px;"></div>
					{/if}
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
{:else}
	<p>No meetings found</p>
{/if}
