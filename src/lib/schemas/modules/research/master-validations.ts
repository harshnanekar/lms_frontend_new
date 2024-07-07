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
	wos_indexed: z.boolean({ required_error: 'WOS indexed is required' }),
	abdc_indexed: z.number().min(1, 'ABDC indexed is required').refine(data => data != 0,'ABDC Indexed Is Required'),
	ugc_indexed: z.boolean({ required_error: 'UGC indexed is required' }),
	scs_indexed: z.boolean({ required_error: 'SCS indexed is required' }),
	foreign_authors_count: z.number().optional(),
	foreign_authors: z.array(z.number()).optional(),
	student_authors_count: z.number().optional(),
	student_authors: z.array(z.number()).optional(),	
	// supporting_documents: z.array(z.instanceof(File)).nonempty({message:'File is required'})
	// .max(5, { message: 'A maximum of 5 files can be uploaded' })
    // .refine((files) => files.every((file) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)), 'Only .pdf, .docx formats are supported'),
    journal_type: z.number().min(1, 'Journal type is required'),
	publication_date: z.string().refine(date => {
        return date !== '1970-01-01';
    }, {
        message: 'Publication date is required',
    }),
	// publication_date: z.date().nullable().refine((date) => date!= null || date != '1970-01-01T00:00:00.000Z', 'Publication date is required')
});


  export type JournalPaperReq = z.infer<typeof journalPaper>;


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
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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
	
