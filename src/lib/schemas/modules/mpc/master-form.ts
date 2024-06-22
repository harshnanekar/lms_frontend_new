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
