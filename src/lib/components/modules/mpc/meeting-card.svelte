<script lang="ts">
	import { STATUS_COLORS } from '$lib/constants/colors';
	import type { MpcMasterList } from '$lib/types/modules/mpc/master-form';
	import MeetingAction from './meeting-action.svelte';

	export let item: MpcMasterList;
</script>

<div class="meeting-list-card space-y-4 pt-4">
	<div class="flex w-full items-center">
		<div class="mr-3 h-fit rounded-lg bg-base px-[12px] py-[2px]">{item.meeting_id}</div>
		<div class="overflow-hidden text-ellipsis whitespace-nowrap">{item.meeting_name}</div>
		<div class="ml-5 md:ml-5">
			<MeetingAction actionData={item} />
		</div>
	</div>
	<div class="flex justify-around pl-8 text-slate-100">
		<div>
			{item.meeting_date}
		</div>
		<div>
			{item.acad_session}
		</div>
	</div>
	<div class="ml-auto {STATUS_COLORS[item.status_abbr.toString().toLocaleLowerCase()]} no-bold">
		{item.status}
	</div>
</div>
