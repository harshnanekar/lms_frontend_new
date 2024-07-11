<script lang="ts">
	import type { TableHeaders } from '$lib/types/layout/table';
	import { STATUS_COLORS } from '$lib/constants/colors';
	// import { headers } from '$lib/test';
	import type { SubjectMeetingDetail } from '$lib/types/modules/mpc/master-form';
	import {BookPublicationHeaders} from "$lib/test";
	import type {BookPublicationDetails, BookPublicationRender}  from '$lib/types/modules/research/research-types';
	import { tooltip } from '$lib/utils/tooltip';
	import { MeetingAction } from '..';
	import { PaginateClient, PaginateDynamic } from '$lib/components/layout/pagination';

	// let tableHeaders: TableHeaders<SubjectMeetingDetail>[] = headers;
    let tableHeaders: TableHeaders<BookPublicationRender>[] = BookPublicationHeaders;

    const url  =  new URL("http://localhost:9090/research/book-publication-paginate");
</script>

<PaginateDynamic url={url} header={BookPublicationHeaders}  />