<script lang="ts">
	import type { TableHeaders } from '$lib/types/layout/table';
	import { STATUS_COLORS } from '$lib/constants/colors';
	// import { headers } from '$lib/test';
	import type { SubjectMeetingDetail } from '$lib/types/modules/mpc/master-form';
	import {ConferenceHeaders} from "$lib/test";
	import type {conferenceDetails, ConferenceRender}  from '$lib/types/modules/research/research-types';
	import { tooltip } from '$lib/utils/tooltip';
	import { MeetingAction } from '..';
	import { PaginateClient, PaginateDynamic } from '$lib/components/layout/pagination';

	// let tableHeaders: TableHeaders<SubjectMeetingDetail>[] = headers;
    let tableHeaders: TableHeaders<ConferenceRender>[] = ConferenceHeaders;

    const url  =  new URL("http://localhost:9090/research/conference-paginate");
</script>

<PaginateDynamic url={url} header={ConferenceHeaders}  />