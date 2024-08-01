import { AuthorIcon, BookChapterIcon, BookPublicationIcon, CaseStudyIcon, ConferenceIcon, DashboardIcon, EContentICon, EditedBookIcon, FacultyIcon, IprIcon, JournalIcon, MeetingStakeholderIcon, PatentIcon, PlusIcon, PublicationIcon, ResearchAwardIcon, ResearchIcon, ResearchProjectIcon, ResearchSeminarIcon, SignOutIcon, TeachMeetBrandIcon } from "$lib/components/icons"

export type JournalPaper = {
	nmims_school: string[];
	nmims_campus: string[];
	publish_year: number;
	policy_cadre: number[];
	all_authors: number[];
	total_authors: number;
	nmims_authors: number[];
	nmims_author_count: number;
	journal_name: string;
	uid: string;
	publisher: string;
	other_authors: number[];
	page_no: string;
	issn_no: string;
	scopus_site_score: number;
	impact_factor: number;
	doi_no: string;
	publication_date: Date;
	title: string;
	gs_indexed: string;
	paper_type: number;
	nationality_type: number;
	wos_indexed: boolean;
	abdc_indexed: number;
	ugc_indexed: boolean;
	scs_indexed: boolean;
	foreign_authors_count: number;
	foreign_authors: number[];
	student_authors_count: number;
	student_authors: number[];
	scopus_indexed: boolean;
	supporting_documents: string[];
	journal_type: number;
};

export type JournalView = {
	nmims_school : string[],
	nmims_campus : string[],
	publish_year :  number,
	policy_cadre : string[],
	total_authors : number,
	journal_name : string,
	publisher : string,
	impact_factor : number,
	status :string
} 


export type BookPublicationRender = {
	id: number;
	all_authors: string[];
	nmims_school: string[];
	nmims_campus: string[];
	publish_year: number;
	title: string;
	isbn_no: string;
	publisher: string;
};

export type BookPublicationDetails = {
	nmims_school: string[];
	nmims_campus: string[];
	all_authors: number[];
	title: string;
	edition: string;
	volume_no: string;
	publisher: string;
	publisher_category: number;
	publish_year: number;
	web_link: string;
	isbn_no: string;
	doi_no: string;
	publication_place: string;
	nmims_authors_count: number;
	nmims_authors: number[];
	supporting_documents: string[];
};

export type BookChapterRender = {
	id: number;
	all_authors: string[];
	nmims_school: string[];
	nmims_campus: string[];
	publish_year: number;
	book_title: string;
	isbn_no: string;
	publisher: string;
};

export type BookChapterDetails = {
	nmims_school: string[];
	nmims_campus: string[];
	all_authors: number[];
	book_title: string;
	chapter_title: string;
	edition: string;
	volume_no: string;
	page_no: string;
	publisher: string;
	publisher_category: number;
	publish_year: number;
	web_link: string;
	isbn_no: string;
	doi_no: string;
	publication_place: string;
	nmims_authors_count: number;
	nmims_authors: number[];
	book_editors: number[];
	supporting_documents: string[];
};

export type TeachingView = {
	pedagogy_innovation: string;
	fdp_program: string;
	student_workshops: string;
	niche: string;
	program_orientation: string;
};

export type MeetingView = {
	ranking: string;
	accreditation: string;
	achievements: string;
	convocation: string;
	inaugral_program: string;
	events: string;
};

 export type brandingView = {
	id: number;
    faculty_recognition : string,
	faculty_awards : string,
	staff_awards : string,
	alumni_awards : string,
	student_awards :string,
	international_ventures : string,
	conference_participation : string,
	organizing_conference : string,
	newspaper_article : string,
	student_event : string
 }

 export type CaseStudyView = {
   title:string,
   all_authors :string,
   edition :string,
   publisher :string,
   publish_year:number,
   volume_no : string
 }

 export type ResearchSeminarView = {
	nmims_school : string[],
	nmims_campus : string[],
	research_date : Date,
	publisher : string,
	journal_name : string
	nmims_authors : string[],
 }

 export type EContentView = {
	faculty_name : string,
	module : string,
	module_platform : string,
	document_link : string,
	facility_list :string
	media_link : string,
 }

 export type ResearchAwardView = {
 nmims_school : string[],
 nmims_campus : string[],
 faculty_name : string,
 award_name : string,
 award_details : string,
 award_organization: string,
 }

 export type FacultyView = {
 
	faculty_name : string,
	institute_name : string,
    address : string,
	designation : string,
    faculty_type : string

 }

 export type InfiniteFacultyView = {
	id : number,
	first_name : string,
	last_name : string,
	username : string
 }[]





 export type ConferenceRender = {
	id: number;
	paper_title: string;
	nmims_school: string[];
	nmims_campus: string[];
	conference_name: string;
	proceeding_published: string;
	issn_no: string;
};

export type conferenceDetails = {
	paper_title: string;
	conference_name: string;
	place: string;
	presenting_author: string;
	proceeding_published: string;
	conference_type: number;
	issn_no: string;
	publication_date: string;
	sponsored: number;
	doi_no: string;
	publication_place: string;
	amount: number;
	nmims_authors_count: number;
	volume_no: string;
	organizing_body: string;
	all_authors: number[];
	faculty_id: number[];
	nmims_school: string[];
	nmims_campus: string[];
};

export type IPRRender = {
	id: number;

	nmims_school: string[];

	nmims_campus: string[];

	title: string;

	appln_no: number;

	institute_affiliation: string;

	filed_date: string;
};

export type IPRData = {
	title: string;

	appln_no: number;

	filed_date: string;

	grant_date: string;

	published_date: string;

	publication_no: number;

	granted_no: number;

	institue_affiliation: string;

	patent_status: number;

	invention_type: number[];

	sdg_goals: number[];

	applicant_names: number[];

	nmims_school: string[];

	nmims_campus: string[];

	inventors_id: number[];

	supporting_documents: string[];
};

export type patentRender = {
	id: number;

	title: string;

	appln_no: number;

	publication_date: string;

	patent_status: number;

	invention_type: number[];
};

export type patentData = {
	title: string;

	appln_no: number;

	publication_date: string;

	patent_status: number;

	invention_type: number[];

	sdg_goals: number[];

	inventors_id: number[];

	supporting_documents: string[];
};

export type ResearchProjectRender = {
	id: number;

	nmims_school: string[];

	nmims_campus: string[];

	title: string;

	funding_amount: number;

	funding_agency: string;

	thrust_area: string;
};

export type ResearchProjectData = {
	title: string;
	grant_proposal: number;
	grant_type: number;
	thrust_area: string;
	grant_date: string;
	funding_amount: number;
	funding_agency: number;
	duration: string;
	scheme: number;
	payment_date: string;
	received_amount: number;
	research_status: number;
	faculty_id: number[];
	supporting_documents: string[];
	nmims_school: string[];
	nmims_campus: string[];
};






 export type conferenceStatus = {
	insert_conference : {
		status: number;
		status_code: number;
		message: string;
	};

}; 

export type updateConferenceStatus = {
	upsert_conference : {
		status: number;
		status_code: number;
		message: string;
	};

};



export type patentStatus = {
	insert_patent_grant: {
		status: number;
		status_code: number;
		message: string;
	};
	
}; 

export type updatePatentStatus = {

	upsert_patent_grant: {
		status: number;
		status_code: number;
		message: string;
	};
};

export type iprStatus = {
	insert_ipr: {
		status: number;
		status_code: number;
		message: string;
	};
	
}; 

export type updateIprStatus = {

	upsert_ipr: {
		status: number;
		status_code: number;
		message: string;
	};
};

export type bookPublicationStatus = {
	insert_book_publication: {
		status: number;
		status_code: number;
		message: string;
	};

}; 




export type updateBookPublicationStatus =  {
	upsert_book_publication: {
		status: number;
		status_code: number;
		message: string;
	};

}
export type bookChapterStatus = {
	insert_book_chapter: {
		status: number;
		status_code: number;
		message: string;
	};

};


export type updateBookChapterStatus = {
	upsert_book_chapter: {
		status: number;
		status_code: number;
		message: string;
	};

}
export type researchProjectStatus = {
	insert_research_project: {
		status: number;
		status_code: number;
		message: string;
	};

};

export type updatedResearchProjectStatus = {

	upsert_research_project: {
		status: number;
		status_code: number;
		message: string;
	};
}; 



export type masterInputView = {
	id: number;
	master_input_name : string,
	input_data_type : string,

 }

 export type InfiniteMasterDataView = {
	username: any;
	id : number,
	first_name : string,
	last_name : string,
	input_data_type : number
 }[] 


 export type masterStatus = {
	insert_master_data: {
		status: number;
		message: string;
	};

 }

 export type InfiniteAdminView = {
    id : number,
	faculty_name : string,
	username : string,
	form_name :string,
	form_lid : number,
	form_status : number | null
 }[]

 type SidebarIcon = {
	[key: string]: unknown;
}

export const SIDEBAR_ICON: SidebarIcon = {
	'dashboard': DashboardIcon,
	'journal': JournalIcon,
	'book-publication': BookPublicationIcon,
	'book-chapter-publication': BookChapterIcon,
	"case-study" : CaseStudyIcon,
	"research-seminar": ResearchSeminarIcon,
	"e-content":EContentICon,
	"research-award":ResearchAwardIcon,
	"teaching-meeting-branding":TeachMeetBrandIcon,
	"sign-out" : SignOutIcon,
	"conference":ConferenceIcon,
	"patent-submission":PatentIcon,
	"research-project":ResearchProjectIcon,
	"ipr" : IprIcon,
	"faculty" : FacultyIcon,
	"edited-book-publication":EditedBookIcon,
	"meeting-stakeholder":MeetingStakeholderIcon,
	"author":AuthorIcon,
    "research":ResearchIcon,
	"publication":PublicationIcon
	// "form-approval"
}
