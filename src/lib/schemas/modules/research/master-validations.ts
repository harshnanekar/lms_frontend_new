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
	other_authors: z.array(z.number()),
	page_no: z.string(),
	issn_no: z.string(),
	scopus_site_score: z.number(),
	impact_factor: z.number().min(1, 'Impact factor is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
	title: z.string().min(1, 'Title is required'),
	gs_indexed: z.string(),
	paper_type: z.number().min(1, {message:'Paper type is required'}),
	wos_indexed: z.boolean({ required_error: 'WOS indexed is required' }),
	abdc_indexed: z.number().min(1, 'ABDC indexed is required'),
	ugc_indexed: z.boolean({ required_error: 'UGC indexed is required' }),
	scs_indexed: z.boolean({ required_error: 'SCS indexed is required' }),
	foreign_authors_count: z.number(),
	foreign_authors: z.array(z.number()),
	student_authors_count: z.number(),
	student_authors: z.array(z.number()),	
	// supporting_documents: z.array(z.instanceof(File)).nonempty({message:'File is required'})
	// .max(5, { message: 'A maximum of 5 files can be uploaded' })
    // .refine((files) => files.every((file) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)), 'Only .pdf, .docx formats are supported'),
    journal_type: z.number().min(1, 'Journal type is required'),
	publication_date: z.date().nullable().refine((date) => date!= null, 'Publication date is required')
});



  export type JournalPaperReq = z.infer<typeof journalPaper>;

  export const bookPublication = z.object({

	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	all_authors: z.array(z.number()).min(1, {message:'All authors are required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	nmims_authors_count: z.number().min(1, { message: 'Author count is required' }),
	publisher: z.string().min(1, 'Publisher is required'),
	volume_no: z.string().min(1, 'Volume number is required'),
	edition: z.string().min(1, 'Edition  is required'),
	web_link: z.string().min(1, 'Website link is required'),
	isbn_no: z.string().min(1, 'ISBN Number  is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
	publication_place: z.string().min(1, 'Place Of Publication'),
    publisher_category: z.number().min(1, 'Publisher category is required')

  })

  export type bookPublicationReq = z.infer<typeof bookPublication>;

  export const fileSchema = z.object({ 
   documents: z.array(z.instanceof(File)).nonempty({message:'File is required'})
	.max(5, { message: 'A maximum of 5 files can be uploaded' })
    .refine((files) => files.every((file) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)), 'Only .pdf, .docx formats are supported'),
  })

    export type FileReq = z.infer<typeof fileSchema>;


