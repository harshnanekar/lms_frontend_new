<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/ui';
	import { MPCMeetingCard, MpcTable, ResearchTable } from '.';
	import { obj } from '$lib/test';
	import { tooltip } from '$lib/utils/tooltip';
	// import type { MeetingListItem } from '$lib/types/modules/mpc/master-form';
	import type { JournalView } from '$lib/types/modules/research/research-types';

	// export let masterFormList: MeetingListItem[] | null;
	export let researchFormList: JournalView[] | null;
	researchFormList = [
		{
			nmims_school: ['KPMSOL'],
			nmims_campus: ['MPSTME'],
			publish_year: 2024,
			policy_cadre: ['Policy'],
			total_authors: 1,
			journal_name: 'journal',
			publisher: 'Publisher',
			impact_factor: 24
		}
	];
</script>

{#if researchFormList}
	<!-- <ResearchTable tableData={researchFormList} /> -->

	<!-- <Accordion collapse spaceBetween>
		{#each researchFormList as item}
			<AccordionItem>
				
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
	</Accordion> -->
{:else}
	<p>No Data found</p>
{/if}
