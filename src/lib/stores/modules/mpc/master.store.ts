import type { MasterMeetingStore } from '$lib/types/modules/mpc/master-form';
import type { JournalPaper } from '$lib/types/modules/research/research-types';

import { writable } from 'svelte/store';

export const defaultMasterStoreValue = {
    MeetingId : 0,
    acadYear: {
        value: new Date().getFullYear().toString(),
        label: new Date().getFullYear().toString(),
    },
    linkPassword: '',
    meetingDate: [],
    meetingName: '',
    meetingSubject: [],
}

export const defaultJournalStore = {
     nmims_school : [],
	 nmims_campus : [],
	 publish_year : 0,
	 policy_cadre : [],
	 all_authors : [],
	 total_authors : 0,
	 nmims_authors : [],
	 nmims_author_count : 0,
	 journal_name : '',
	 uid : '',
	 publisher : '',
	 other_authors : [],
	 page_no : '',
	 issn_no : '',
	 scopus_site_score : 0,
	 impact_factor : 0,
     doi_no : '',
	 publication_date : '',
	 title : '',
	 gs_indexed : '',
	 paper_type : 0,
	 nationality_type : 0,
	 wos_indexed : true,
	 abdc_indexed : 0,
	 ugc_indexed : 0,
	 foreign_author_count : 0,
	 foreign_authors : [],
	 student_author_count : 0,
	 student_authors : [],
	 scopus_indexed : true,
	 supporting_documents : []
}

export const journalStore = writable<JournalPaper>(defaultJournalStore);
export const masterFormStore = writable<MasterMeetingStore>(defaultMasterStoreValue);

let url =new URL("http://localhost:9090/research");
export const paginateUrl = writable<URL>(url);