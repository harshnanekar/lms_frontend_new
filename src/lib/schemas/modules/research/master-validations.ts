import { z } from 'zod';

export const journalPaper = z.object({
    nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	policy_cadre: z.array(z.number()).min(1, {message:'Policy cadre is required'}),
	all_authors: z.array(z.number()).min(1, {message:'All authors are required'}),
	total_authors: z.number().min(1, {message:'Total author count is required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	nmims_author_count: z.number().min(1, { message: 'Author count is required' }),
	journal_name: z.string().min(1, 'Journal name is required'),
	uid: z.string().min(1, 'UID is required'),
	publisher: z.string().min(1, 'Publisher is required'),
	other_authors: z.array(z.number()).optional(),
	page_no: z.string().optional(),
	issn_no:z.string().optional(),
	scopus_site_score: z.number().optional(),
	impact_factor: z.number().min(1, 'Impact factor is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
	title: z.string().min(1, 'Title is required'),
	gs_indexed: z.string().optional(),
	paper_type: z.number().min(1, {message:'Paper type is required'}).refine(data => data != 0,'Paper Type Is Required'),
	wos_indexed: z.boolean({required_error:'WOS indexed is required'}),
	abdc_indexed: z.union([z.number(), z.null()]).optional(),
	ugc_indexed: z.boolean({required_error:'UGC indexed is required'}),
	scs_indexed: z.boolean({required_error:'Scopus indexed is required'}),
	foreign_authors_count: z.number().optional(),
	foreign_authors: z.array(z.number()).optional(),
	student_authors_count: z.number().optional(),
	student_authors: z.array(z.number()).optional(),	
    journal_type: z.number().min(1, 'Journal type is required'),
	publication_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';;
    }, {
        message: 'Publication date is required',
    }),
});




  export type JournalPaperReq = z.infer<typeof journalPaper>;

  export const bookPublication = z.object({

	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	all_authors: z.array(z.number()).min(1, {message:'All authors are required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	title: z.string().min(1, 'Title is required'),
	edition: z.string().min(1, 'Edition  is required'),
	volume_no: z.string().min(1, 'Volume number is required'),
	publisher_category: z.number().min(1, 'Publisher category is required'),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	publisher: z.string().min(1, 'Publisher is required'),
	web_link: z.string().min(1, 'Website link is required'),
	isbn_no: z.string().min(1, 'ISBN Number  is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
	publication_place: z.string().min(1, 'Place Of Publication'),
	nmims_authors_count: z.number().min(1, { message: 'Author count is required' })

  })

  export type bookPublicationReq = z.infer<typeof bookPublication>;


  export const bookChapterPublication = z.object({

	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	all_authors: z.array(z.number()).min(1, {message:'All authors are required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	book_editors: z.array(z.number()).min(1, {message:'Book editors are required'}),
	book_title: z.string().min(1, ' Book Title is required'),
	chapter_title: z.string().min(1, 'Chapter Title is required'),
	edition: z.string().min(1, 'Edition  is required'),
	chapter_page_no: z.string().min(1, 'Page number is required'),
	volume_no: z.string().min(1, 'Volume number is required'),
	publisher_category: z.number().min(1, 'Publisher category is required'),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	publisher: z.string().min(1, 'Publisher is required'),
	web_link: z.string().min(1, 'Website link is required'),
	isbn_no: z.string().min(1, 'ISBN Number  is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
	publication_place: z.string().min(1, 'Place Of Publication'),
	nmims_authors_count: z.number().min(1, { message: 'Author count is required' })
	

  });

  export type bookChapterPublicationReq = z.infer<typeof bookChapterPublication>;

const teachingItemSchema = z.object({
  input_type: z.string().min(1,{message:'Teaching Excellance Type Is Required'}),
  description: z.string().min(1,{message:'Description Is Required'}),
  link: z.string().min(1,{message:'Link Is Required'}),
});



export const teachingItemsSchema = z.array(teachingItemSchema);

export type TeachingItemsReq = z.infer<typeof teachingItemsSchema>;


const meetingItemSchema = z.object({
	input_type: z.string().min(1,{message:'Meeting Stakeholder Type Is Required'}),
	description: z.string().min(1,{message:'Description Is Required'}),
	link: z.string().min(1,{message:'Link Is Required'}),
  });
  
  export const meetingItemsSchema = z.array(meetingItemSchema);
  
  export type meetingItemsReq = z.infer<typeof meetingItemsSchema>;


  const brandingItemSchema = z.object({
	input_type: z.string().min(1,{message:'Branding & Advertisement Type Is Required'}),
	description: z.string().min(1,{message:'Description Is Required'}),
	link: z.string().min(1,{message:'Link Is Required'}),
  });
  
  export const brandingItemsSchema = z.array(brandingItemSchema);
  
  export type brandingItemsReq = z.infer<typeof brandingItemsSchema>;



  export const fileSchema = z.object({
	documents: z.array(z.instanceof(File)).nonempty({ message: 'File is required' })
	  .max(5, { message: 'A maximum of 5 files can be uploaded' })
	  .refine(
		(files) => files.every((file) => [
		  'application/pdf',
		  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		  'application/vnd.ms-excel',
		  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		  'application/octet-stream'
		].includes(file.type)),
		{ message: 'Only .pdf, .docx, .xls, .xlsx formats are supported' }
	  ),
  });
  
  
	  export type FileReq = z.infer<typeof fileSchema>;


	  const validFileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];

	const getFileExtension = (fileName: string): string => {
	  return fileName.split('.').pop()?.toLowerCase() || '';
	};
	
	export const validateFiles = (files: { name: string; type: string; size: number }[]): { status: boolean, message: string } => {
	  try {
		if (!Array.isArray(files)) {
		  return { status: false, message: 'Invalid files data' };
		}
	
		if (files.length === 0) {
		  return { status: false, message: 'File is required' };
		}
	
		if (files.length > 5) {
		  return { status: false, message: 'Maximum 5 files are allowed' };
		}
	
		for (const file of files) {
		  const fileExtension = getFileExtension(file.name);
		  if (!validFileExtensions.includes(fileExtension)) {
			return { status: false, message: 'Only .pdf, .doc, .docx, .xls, .xlsx formats are supported' };
		  }
		}
	
		return { status: true, message: 'Files are valid' };
	  } catch (e: any) {
		console.log(e);
		return { status: false, message: e.message };
	  }
	};
	

	export const caseStudy = z.object({

	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	all_authors: z.array(z.number()).min(1, {message:'All authors are required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	title: z.string().min(1, 'Title is required'),
	edition: z.string().optional(),
	page_no: z.string().optional(),
	volume_no: z.string().min(1, 'Volume number is required'),
	publisher: z.string().min(1, 'Publisher is required'),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	publisher_category: z.number().min(1, 'Publisher category is required'),
	url: z.string().min(1, 'Url is required'),
	nmims_authors_count: z.number().min(1, { message: 'Author count is required' })
	
  });

  export type caseStudyReq = z.infer<typeof caseStudy>;


  
export const researchSeminarObj = z.object({
    nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	topic : z.string().min(1,{message:'Topic is required'}),
	resource_person: z.string().optional(),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	paper_title: z.string().min(1, 'Title is required'),
	journal_name: z.string().min(1, 'Journal name is required'),
	publisher: z.string().min(1, 'Publisher is required'),
	publisher_category: z.number().min(1, 'Publisher category is required'),
	volume_no: z.string().optional(),
	issn_no:z.string().optional(),
	scopus_site_score: z.string().optional(),
	impact_factor: z.number().optional(),
	scs_indexed: z.string().optional(),
	wos_indexed: z.boolean({required_error:'WOS indexed is required'}),
	gs_indexed: z.string().optional(),
	abdc_indexed: z.union([z.number(), z.null()]).optional(),
	ugc_indexed: z.boolean({required_error:'UGC indexed is required'}),
	doi_no: z.union([z.string(), z.null()]).optional(),
	uid: z.string().min(1, 'UID is required'),
	publication_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Publication date is required',
    }),
	research_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== ''; 
    }, {
        message: 'Research seminar date is required',
    }),
});

  export type ResearchSeminarReq = z.infer<typeof researchSeminarObj>;


   
export const EContentObj = z.object({
	faculty_name : z.string().min(1,{message:'Faculty name is required'}),
	module: z.string().min(1,{message:'Module developed name is required'}),
	module_platform: z.string().min(1,{message:'Module platform is required'}),
	document_link: z.string().min(1, {message:'Link for document and facility available is required'}),
	facility_list: z.string().min(1, {message:'Link for development facility available is required'}),
	media_link: z.string().min(1, {message:'Link to videos for media centre is required'}),
	launching_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Launching date is required',
    }),

});

  export type EContentReq = z.infer<typeof EContentObj>;


  export const researchAwardObj = z.object({
	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	faculty_name: z.string().min(1,{message:'Faculty name is required'}),
	award_name: z.string().min(1,{message:'Award name is required'}),
	award_details: z.string().min(1,{message:'Award details is required'}),
	award_organization : z.string().min(1,{message:'Award organization is required'}),
	award_place: z.string().min(1,{message:'Award place is required'}),
	award_category: z.number().min(1,{message:'Award category is required'}),
	award_date : z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Award date is required',
    })
  });

  export type researchAwardReq = z.infer<typeof researchAwardObj>;


   const Faculty = z.object({
	faculty_id : z.number(),
    first_name : z.string().min(1,{message:'Faculty firstname is required'}),
	last_name : z.string().min(1,{message:'Faculty lastname is required'}),
	username : z.string().min(1,{message:'Faculty username is required'}),
    institute : z.string().min(1,{message :'Faculty institute name is required'}),
	address : z.string().min(1,{message:'Faculty address is required'}),
	designation : z.string().min(1,{message:'Faculty designation is required'}),
    faculty_type : z.number().refine(data => data != 0,'Faculty type is required'),
  })

  export const facultyObj = z.array(Faculty).min(1,{message:'Faculty details are required'});
  export type facultyReq = z.infer<typeof facultyObj>;

  export const facultyUpd = z.object({
	faculty_id  : z.number(),
	faculty_name : z.string().min(1,{message:'Faculty name is required'}),
    institute : z.string().min(1,{message :'Faculty institute name is required'}),
	address : z.string().min(1,{message:'Faculty address is required'}),
	designation : z.string().min(1,{message:'Faculty designation is required'}),
    faculty_type : z.number().refine(data => data != 0,'Faculty type is required'),
  })

  export type facultyUpdReq = z.infer<typeof facultyUpd>;

  export const loginCredentials = z.object({
	username : z.string().min(1,{message:'Username is required'}),
	password : z.string().min(1,{message:'Password is required'}),
  })

  export type loginReq = z.infer<typeof loginCredentials>;


