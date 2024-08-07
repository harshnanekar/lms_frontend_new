import { PUBLIC_BASE_URL } from '$env/static/public';
import type { TableHeaders } from './types/layout/table';
import type { SubjectMeetingDetail } from './types/modules/mpc/master-form';
import type {
	JournalPaper,
	JournalView,
	BookPublicationRender,
	BookChapterRender,
	BookChapterDetails,
	brandingView,
	MeetingView,
	TeachingView,
	CaseStudyView,
	ResearchSeminarView,
	EContentView,
	ResearchAwardView,
	FacultyView,
	masterInputView,
	patentRender,
	IPRRender,
	ConferenceRender,
	EditedBookPublicationView,
	ResearchProjectRender,
	// ConferenceRender,
	// IPRRender,
	// patentRender,
	// masterInputView
 } from './types/modules/research/research-types';

export const SIDEBAR_URL = [
	{
		url: `${PUBLIC_BASE_URL}dashboard`,
		icon: 'dashboard',
		label: 'Home',
		module: null,
		child: []
	},
		{
			url: `${PUBLIC_BASE_URL}journal-paper`,
			icon: 'journal',
			label: 'Journal Articles Published',
			module: null,
			child: []
		},

	    {
			url: `${PUBLIC_BASE_URL}publications`,
			icon: 'publication',
			label: 'Book Publications',
			module: null,
			child: [ {
				url: `${PUBLIC_BASE_URL}book-publication`,
				icon: 'book-publication',
				label: 'Book Publication',
				module: null,
				child: []
				},
		
				{
				url: `${PUBLIC_BASE_URL}book-chapter-publication`,
				icon: 'book-chapter-publication',
				label: 'Book Chapter Publication',
				module: null,
				child: []
			}, 
			{
				url: `${PUBLIC_BASE_URL}edited-book-publication`,
				icon: 'edited-book-publication',
				label: 'Edited Book Publication',
				module: null,
				child: []
			}, 
		]
			},

	{
		url: `${PUBLIC_BASE_URL}conference`,
		icon: 'conference',
		label: 'Conference',
		module: null,
		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}ipr`,
		icon: 'ipr',
		label: 'IPR',
		module: null,
		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}patent-submission-and-grant`,
		icon: 'patent-submission',
		label: 'Patent Submission And Grant',
		module: null,
		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}project`,
		icon: 'research-project',
		label: 'Research Project',
		module: null,
		child: []
	},
	{
		url: `${PUBLIC_BASE_URL}teaching-meeting-branding`,
		icon: 'teaching-meeting-branding',
		label: 'Teaching-Meeting-Branding',
		module: null,
		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}case-study`,
		icon: 'case-study',
		label: 'Case Study',
		module: null,

		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}seminars`,
		icon: 'research-seminar',
		label: 'Research Seminars',
		module: null,

		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}e-content`,
		icon: 'e-content',
		label: 'E-Content Development',
		module: null,
		child: []
	},
	{
		url: `${PUBLIC_BASE_URL}award`,
		icon: 'research-award',
		label: 'Research Award',
		module: null,
		child: []
	},

	{
		url: `${PUBLIC_BASE_URL}add-faculty`,
		icon: 'faculty',
		label: 'Add Faculty',
		module: null,
		child: []
	},
	{
		url: `${PUBLIC_BASE_URL}master-input-data`,
		icon: 'author',
		label: 'Add Author',
		module: null,
		child: []
	}
// ]
// }
];

export const obj = [
	{
		meeting_id: '1',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: 'Tri III, 2023',
		status: 'Completed',
		status_abbr: 'COMPLETED'
	},
	{
		meeting_id: '2',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: 'Tri III, 2023',
		status: 'Scheduled',
		status_abbr: 'SCHEDULED'
	},
	{
		meeting_id: '1',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: ' Tri III, 2023',
		status: 'Pending Form A',
		status_abbr: 'PENDING_FORMA'
	},
	{
		meeting_id: '2',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: 'Tri III, 2023',
		status: 'Pending Form-B',
		status_abbr: 'PENDING_FORMB'
	}
];

export const headers: TableHeaders<SubjectMeetingDetail>[] = [
	{
		label: 'MID',
		key: 'meeting_id',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Meeting Name',
		key: 'meeting_name',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Meeting Date',
		key: 'meeting_date',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},
	{
		label: 'Acad Session',
		key: 'acad_session',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Status',
		key: 'status',
		sortable: false,
		classes: '',
		showTooltip: false
	}
];

export const paginationHeaders: TableHeaders<JournalView>[] = [
	{
		label: 'Publishing Year',
		key: 'publish_year',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Nmims School',
		key: 'nmims_school',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Nmims Campus',
		key: 'nmims_campus',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},
	{
		label: 'Policy Cadre',
		key: 'policy_cadre',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Impact Factor By Clarivate Analytics',
		key: 'impact_factor',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Publisher',
		key: 'publisher',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Total No. Of Authors',
		key: 'total_authors',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Journal Name',
		key: 'journal_name',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	// {
	// 	label: 'Status',
	// 	key: 'status',
	// 	sortable: false,
	// 	classes: '',
	// 	showTooltip: false
	// },
];

export const BookPublicationHeaders: TableHeaders<BookPublicationRender>[] = [
	{
		label: 'All Authors Names',
		key: 'all_authors',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Nmims School',
		key: 'nmims_school',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Nmims Campus',
		key: 'nmims_campus',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},

	{
		label: 'Publishing Year',
		key: 'publish_year',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Title Of Book',
		key: 'title',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'ISBN Number',
		key: 'isbn_no',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Publisher Name',
		key: 'publisher',
		sortable: false,
		classes: '',
		showTooltip: false
	}
];

export const BookChapterHeaders: TableHeaders<BookChapterRender>[] = [
	{
		label: 'All Authors Names',
		key: 'all_authors',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Nmims School',
		key: 'nmims_school',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Nmims Campus',
		key: 'nmims_campus',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},

	{
		label: 'Publishing Year',
		key: 'publish_year',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Book title',
		key: 'book_title',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'ISBN Number',
		key: 'isbn_no',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Publisher Name',
		key: 'publisher',
		sortable: false,
		classes: '',
		showTooltip: false
	}
];

export const teachingHeaders: TableHeaders<TeachingView>[] = [
	{
		label: 'Peadagogy Innovation',
		key: 'pedagogy_innovation',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'FDP Program On Academic',
		key: 'fdp_program',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Workshop For Students',
		key: 'student_workshops',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},
	{
		label: 'Inviting Visiting Faculty From The Industry To Handle Niche Workshops',
		key: 'niche',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Program Orientation',
		key: 'program_orientation',
		sortable: false,
		classes: '',
		showTooltip: false
	}
];

export const meetingHeaders: TableHeaders<MeetingView>[] = [
	{
		label: 'Ranking Description',
		key: 'ranking',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Accreditation',
		key: 'accreditation',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'School/Campus Achievements',
		key: 'achievements',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Convocation At NMIMS',
		key: 'convocation',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Inaugral Program At NMIMS',
		key: 'inaugral_program',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Events At NMIMS',
		key: 'events',
		sortable: false,
		classes: '',
		showTooltip: false
	}
];

export const brandingHeaders: TableHeaders<brandingView>[] = [
	{
		label: 'Faculty Recognition',
		key: 'faculty_recognition',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Faculty Awards',
		key: 'faculty_awards',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Staff Awards',
		key: 'staff_awards',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Alumini Awards',
		key: 'alumni_awards',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Student Awards',
		key: 'student_awards',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'International Linkage Ventures',
		key: 'international_ventures',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Conference Participation',
		key: 'conference_participation',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Organizing Conference At NMIMS',
		key: 'organizing_conference',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Student Event Participation',
		key: 'student_event',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Newspaper Article',
		key: 'newspaper_article',
		sortable: false,
		classes: '',
		showTooltip: false
	},



 ];



export const CaseStudyHeaders : TableHeaders<CaseStudyView>[] = [
  
	{
	   label: 'All Authors Names',
	   key: 'all_authors',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },
   {
	   label: 'Title',
	   key: 'title',
	   sortable: false,
	   classes: '',
	   showTooltip: false
   },
   {
	   label: 'Edition',
	   key: 'edition',
	   sortable: false,
	   classes: 'whitespace-nowrap',
	   showTooltip: false
   },
   {
	   label: 'Publisher',
	   key: 'publisher',
	   sortable: false,
	   classes: '',
	   showTooltip: false
   },
   {
	   label: 'Publication Year',
	   key: 'publish_year',
	   sortable: false,
	   classes: '',
	   showTooltip: false
   },
    {
	   label: 'Volume No',
	   key: 'volume_no',
	   sortable: false,
	   classes: '',
	   showTooltip: false
   },
]; 


export const researchSeminarHeaders : TableHeaders<ResearchSeminarView>[] = [

   {
	   label: 'Nmims Campus',
	   key: 'nmims_campus',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },
  
   
   {
	   label: 'Nmims School',
	   key: 'nmims_school',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },

   
   {
	   label: 'Research Date',
	   key: 'research_date',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },

   
   {
	   label: 'Publisher',
	   key: 'publisher',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },

   
   {
	   label: 'Journal Name',
	   key: 'journal_name',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },

  {
	   label: 'NMIMS Authors',
	   key: 'nmims_authors',
	   sortable: false,
	   classes: 'id',
	   showTooltip: false
   },
  
];

export const econtentHeaders : TableHeaders<EContentView>[] = [
	{
		label: 'Name of the Faculty',
		key: 'faculty_name',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Name of the module developed',
		key: 'module',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Platform on which module is developed',
		key: 'module_platform',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Link to the relevant document and facility available in the institution',
		key: 'document_link',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'List of the e-content development facility available',
		key: 'facility_list',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Provide link to videos of the media centre and recording facility',
		key: 'media_link',
		sortable: false,
		classes: 'id',
		showTooltip: false
	}
];

export const ResearchAwardHeaders : TableHeaders<ResearchAwardView>[] = [
	{
		label: 'Nmims School',
		key: 'nmims_school',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Nmims Campus',
		key: 'nmims_campus',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Faculty Name',
		key: 'faculty_name',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Award Name',
		key: 'award_name',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Award Details',
		key: 'award_details',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Name Of Organization Conferring The Award',
		key: 'award_organization',
		sortable: false,
		classes: 'id',
		showTooltip: false
	}

];


export const FacultyHeaders : TableHeaders<FacultyView>[] = [
	{
		label: 'Name Of Faculty',
		key: 'faculty_name',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Institue',
		key: 'institute_name',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Address',
		key: 'address',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Designation',
		key: 'designation',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Faculty Type',
		key: 'faculty_type',
		sortable: false,
		classes: 'id',
		showTooltip: false
	}
]; 


export const ConferenceHeaders: TableHeaders<ConferenceRender>[] = [
	{
		label: 'Nmims School',
		key: 'nmims_school',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Nmims Campus',
		key: 'nmims_campus',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},

	{
		label: 'Title Of The Paper',
		key: 'paper_title',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Name of Conference ',
		key: 'conference_name',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'Proceedings published',
		key: 'proceeding_published',
		sortable: false,
		classes: '',
		showTooltip: false
	},

	{
		label: 'ISBN Number',
		key: 'issn_no',
		sortable: false,
		classes: '',
		showTooltip: false
	}
]; 




// export type ResearchProjectRender = {
// 	id: number;

// 	nmims_school: string[];

// 	nmims_campus: string[];

// 	title: string;

// 	funding_amount: number;

// 	funding_agency: string;

// 	thrust_area: string;
// }; 




export const IPRHeaders: TableHeaders<IPRRender>[] = [
	{
		label: 'Nmims School',

		key: 'nmims_school',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Nmims Campus',

		key: 'nmims_campus',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Title of Patent / Invention',

		key: 'title',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Patent/Invention Application Number',

		key: 'appln_no',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Institute Affiliation',

		key: 'institute_affiliation',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Patent Filed Date',

		key: 'filed_date',

		sortable: false,

		classes: '',

		showTooltip: false
	}
];

export const PatentHeaders: TableHeaders<patentRender>[] = [
	{
		label: 'Title of Invention',

		key: 'title',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Type of Invention(IPR)',

		key: 'invention_type',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Patent Stage',

		key: 'patent_status',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Application Number',

		key: 'appln_no',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Date of Filing/Grant/Published',

		key: 'publication_date',

		sortable: false,

		classes: '',

		showTooltip: false
	}
];

export const ResearchProjectHeaders: TableHeaders<ResearchProjectRender>[] = [
	{
		label: 'Nmims School',

		key: 'nmims_school',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Nmims Campus',

		key: 'nmims_campus',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Title of Project',

		key: 'title',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Funding Amount ',

		key: 'funding_amount',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Name of Funding Agency',

		key: 'funding_agency',

		sortable: false,

		classes: '',

		showTooltip: false
	},

	{
		label: 'Thrust area of Research',

		key: 'thrust_area',

		sortable: false,

		classes: '',

		showTooltip: false
	}
]; 



export const MasterHeaders : TableHeaders<masterInputView>[] = [
	{
		label: 'Name',
		key: 'master_input_name',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Type',
		key: 'input_data_type',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},

]; 

export const EditedBookPublicationHeader : TableHeaders<EditedBookPublicationView>[] = [ 
    {
        label: 'Author Name',
        key: 'authors',
        sortable: false,
        classes: '',
        showTooltip: false
    },
    {
        label: 'NMIMS Campus - Author',
        key: 'campuses',
        sortable: false,
        classes: '',
        showTooltip: false
    },
    {
        label: 'NMIMS School - Author',
        key: 'schools',
        sortable: false,
        classes: '',
        showTooltip: false
    },
    {
        label: 'Publication Year',
        key: 'publish_year',
        sortable: false,
        classes: '',
        showTooltip: false
    },
    {
        label: 'Book Title',
        key: 'title',
        sortable: false,
        classes: '',
        showTooltip: false
    },
    {
        label: 'ISBN Number',
        key: 'isbn_no',
        sortable: false,
        classes: '',
        showTooltip: false
    },
    {
        label: 'Publisher Name',
        key: 'publisher',
        sortable: false,
        classes: '',
        showTooltip: false
    },
];