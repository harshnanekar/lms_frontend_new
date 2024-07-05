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

 export type EditedBookPublicationView = {
	edit_book_publication_authors: string[],
	campus_name : string[],
	school_name: string[],
	publish_year: number,
	title: string,
	isbn_no: number,
	publisher: string
 }

