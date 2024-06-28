import { z } from 'zod';

export const meetingSchema = z.object({
	meeting_name: z.string().min(1, { message: 'Meeting name is required' }),
	acad_year: z.string().min(1, { message: 'Academic year is required' }),
	link_password: z.string().min(1, { message: 'Link password is required' }),
	meeting_date: z
		.array(z.coerce.date({ message: 'Invalid date' }))
		.min(1, { message: 'At least one meeting date is required' }),
	meeting_subject: z
		.array(
			z.object({
				campus_lid: z.string().min(1, { message: 'Campus is required' }),
				program_lid: z.string().min(1, { message: 'Program is required' }),
				acad_session: z.string().min(1, { message: 'Academic session is required' }),
				subject_lid: z.string().min(1, { message: 'Subject is required' }),
				is_parent: z.boolean(),
				program_anchor: z
					.array(z.string().min(1, { message: 'Program anchor cannot be empty' }))
					.min(1, { message: 'At least one program anchor is required' }),
				course_anchor: z
					.array(z.string().min(1, { message: 'Course anchor cannot be empty' }))
					.min(1, { message: 'At least one course anchor is required' }),
				attendees: z
					.array(z.string())
					.min(1, { message: 'At least one attendee is required' })
					.optional()
			})
		)
		.min(1, { message: 'At least one meeting subject is required' })
		.refine((subjects) => subjects.filter((subject) => subject.is_parent).length === 1, {
			message: 'One meeting subject must be a parent',
			path: ['is_parent']
		})
})
.refine((obj) => {
	// unique acad_year, program_lid and subject_lid combine
	const unique = new Set();
	for (const subject of obj.meeting_subject) {
		const key = `${obj.acad_year}-${subject.program_lid}-${subject.subject_lid}`;
		if (unique.has(key)) return false;
		unique.add(key);
	}
	return true;
}, {
	message: "Academic year, program, and subject combinations must be unique",
})

export type MasterFormReq = z.infer<typeof meetingSchema>;


export const journalPaper = z.object({
	 publish_year : z.number().refine(data => {
		if(data >= 1900 && data <= 3000){
			return true;
		}
		return false;
	 },{
		message : 'Invalid Year'
	 }),
	 policy_cadre : z.array().min(1,'Select At Least One Input'),
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


	
});