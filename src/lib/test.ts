import type { TableHeaders } from './types/layout/table';
import type { SubjectMeetingDetail } from './types/modules/mpc/master-form';
import type { JournalPaper, JournalView, BookPublicationRender,
	BookChapterRender, BookChapterDetails,
	brandingView,
	MeetingView,
	TeachingView,
	CaseStudyView,
	ResearchSeminarView,
	EContentView,
	ResearchAwardView, EditedBookPublicationView
 } from './types/modules/research/research-types';



export const SIDEBAR_URL = [
	{
		url: '/',
		icon: 'dashboard',
		label: 'Home',
		module: null,
		child: []
	},
	{
		url: '/test',
		icon: 'test',
		label: 'Research',
		module: null,
		child: []
	},
	{
		url: '/journal-paper',
		icon: 'test',
		label: 'Journal Articles Published',
		module: null,
		child: []
	},

	{
		url: '/book-publication',
		icon: 'test',
		label: 'Book Publication',
		module: null,
		child: []
	},

	{
		url: '/edited-book-publication',
		icon: 'test',
		label: 'Edited Book Publication',
		module: null,
		child: []
	},

	{
		url: '/book-chapter-publication',
		icon: 'test',
		label: 'Book Chapter Publication',
		module: null,
		child: []
	},
	{
		url: '/teaching-meeting-branding',
		icon: 'test',
		label: 'Teaching-Meeting-Branding',
		module: null,
		child: []
	},
	{
		url: '/case-study',
		icon: 'test',
		label: 'Case Study',
		module: null,
		child: []
	},
	{
		url: '/research-seminars',
		icon: 'test',
		label: 'Research Seminars',
		module: null,
		child: []
	},
	{
		url: '/e-content',
		icon: 'test',
		label: 'E-Content Development',
		module: null,
		child: []
	},
	{
		url: '/research-award',
		icon: 'test',
		label: 'Research Award',
		module: null,
		child: []
	},
	{
		url: '/page',
		icon: 'Mpc',
		label: 'Mpc',
		module: null,
		child: []
	},
	{
		url: '#2',
		icon: 'mpc',
		label: 'MPC',
		module: 'mpc',
		child: [
			{
				url: '#3',
				icon: 'overview',
				label: 'Overview',
				module: 'mpc',
				child: []
			},
			{
				url: '#4',
				icon: 'forecast',
				label: 'Forecast',
				module: 'mpc',
				child: []
			},
			{
				url: '#5',
				icon: 'plan',
				label: 'Plan',
				module: 'mpc',
				child: []
			},
			{
				url: '#6',
				icon: 'execute',
				label: 'Execute',
				module: 'mpc',
				child: []
			},
			{
				url: '#7',
				icon: 'monitor',
				label: 'Monitor',
				module: 'mpc',
				child: []
			},
			{
				url: '#8',
				icon: 'plan',
				label: 'Plan',
				module: 'mpc',
				child: []
			},
			{
				url: '#9',
				icon: 'execute',
				label: 'Execute',
				module: 'mpc',
				child: []
			},
			{
				url: '#10',
				icon: 'monitor',
				label: 'Monitor',
				module: 'mpc',
				child: []
			},
			{
				url: '#11',
				icon: 'plan',
				label: 'Plan',
				module: 'mpc',
				child: []
			},
			{
				url: '#12',
				icon: 'execute',
				label: 'Execute',
				module: 'mpc',
				child: []
			},
			{
				url: '#13',
				icon: 'monitor',
				label: 'Monitor',
				module: 'mpc',
				child: []
			}
		]
	}
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


export const paginationHeaders : TableHeaders<JournalView>[] = [
  
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
	}
]; 



export const BookPublicationHeaders :  TableHeaders<BookPublicationRender>[] = [

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

]

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


export const BookChapterHeaders :  TableHeaders<BookChapterRender>[] = [

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

]


export const teachingHeaders : TableHeaders<TeachingView>[] = [
  
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
   },
]; 


 export const meetingHeaders : TableHeaders<MeetingView>[]=[
    
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
	},



 ];


 export const brandingHeaders : TableHeaders<brandingView>[]=[
    
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
   }

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