export type JournalPaper = {
	 nmims_school : string[],
	 nmims_campus : string[],
	 publish_year : number,
	 policy_cadre : number[],
	 all_authors : number[],
	 total_authors : number,
	 nmims_authors : number[],
	 nmims_author_count : number,
	 journal_name : string,
	 uid : string,
	 publisher : string,
	 other_authors : number[],
	 page_no : string,
	 issn_no : string,
	 scopus_site_score : number,
	 impact_factor : number,
     doi_no : string,
	 publication_date : Date,
	 title : string,
	 gs_indexed : string,
	 paper_type : number,
	 nationality_type : number,
	 wos_indexed : boolean,
	 abdc_indexed : number,
	 ugc_indexed : boolean,
	 scs_indexed:boolean,
	 foreign_authors_count : number,
	 foreign_authors : number[],
	 student_authors_count : number,
	 student_authors : number[],
	 scopus_indexed : boolean,
	 supporting_documents : string[],
	 journal_type : number
 }

 export type JournalView = {
	 nmims_school : string[],
	 nmims_campus : string[],
	 publish_year :  number,
	 policy_cadre : string[],
	 total_authors : number,
	 journal_name : string,
	 publisher : string,
	 impact_factor : number,
 } 



export type BookPublicationRender = {
	all_authors: string[],
	nmims_school: string[],
    nmims_campus: string[],
	publish_year: number,
	title: string,
	isbn_no: string,
	publisher: string,
}


export type BookPublicationDetails = {
	nmims_school: string[],
    nmims_campus: string[],
	all_authors: number[],
	title: string,
    edition: string,
    volume_no: string,
    publisher: string,
	publisher_category: number,
	publish_year: number,
    web_link: string,
	isbn_no: string,
    doi_no: string,
    publication_place: string,
    nmims_authors_count: number,
    nmims_authors: number[],
    supporting_documents: string[],
}

export type BookChapterRender = {
	all_authors: string[],
	nmims_school: string[],
    nmims_campus: string[],
	publish_year: number,
	book_title: string,
	isbn_no: string,
	publisher: string,
}



export type BookChapterDetails = {
	nmims_school: string[],
    nmims_campus: string[],
	all_authors: number[],
	book_title: string,
	chapter_title: string;
    edition: string,
    volume_no: string,
	page_no: string;
    publisher: string,
	publisher_category: number,
	publish_year: number,
    web_link: string,
	isbn_no: string,
    doi_no: string,
    publication_place: string,
    nmims_authors_count: number,
    nmims_authors: number[],
	book_editors: number[],
    supporting_documents: string[],

}

 export type TeachingView =  {
	 pedagogy_innovation : string,
	 fdp_program :string,
     student_workshops :string,
     niche : string,
	 program_orientation :string
 }

 export type MeetingView = {
	ranking:string,
	accreditation:string,
	achievements :string,
	convocation :string,
	inaugral_program:string,
	events :string
 }

 export type brandingView = {
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


 export type ConferenceRender = {
	paper_title: string,
	nmims_school: string[],
    nmims_campus: string[],
	conference_name: string,
	proceeding_published: string,
	issn_no: string 
} 


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
}



export type IPRRender = {

    nmims_school : string[],

    nmims_campus : string[],

    title :string,

    appln_no :number,

    institue_affiliation :string,

    filed_date:string,




 } 






 export type IPRData = {

    title: string;

    appln_no: number

    filed_date:string;

    grant_date:string;  

    published_date: string;

    publication_no: number;

    granted_no: number;

    institue_affiliation: string;

    patent_status: number;

    invention_type : number[];

    sdg_goals : number[];

    applicant_names :number[];

    nmims_school : string[];

    nmims_campus:string[];  

    inventors_id: number[];

    supporting_documents:string[];

}
