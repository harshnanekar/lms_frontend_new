import { z } from 'zod';

export const meetingSchema = z.object({
  meeting_name: z.string().min(1, { message: 'Meeting name is required' }),
  acad_year: z.string().min(1, { message: 'Academic year is required' }),
  link_password: z.string().min(1, { message: 'Link password is required' }),
  meeting_date: z
    .array(z.coerce.date({ message: 'Invalid date format' }))
    .min(1, { message: 'At least one meeting date is required' }),
  meeting_subject: z
    .array(
      z.object({
        campus_lid: z.string().min(1, { message: 'Campus is required' }),
        program_lid: z.string().min(1, { message: 'Program is required' }),
        acad_session: z.string().min(1, { message: 'Academic session is required' }),
        subject_lid: z.string().min(1, { message: 'Subject is required' }),
        is_parent: z.boolean().refine((val) => typeof val === 'boolean', {
          message: 'is_parent must be a boolean value',
        }),
        program_anchor: z
          .array(z.string().min(1, { message: 'Program anchor cannot be empty' }))
          .min(1, { message: 'At least one program anchor is required' }),
        course_anchor: z
          .array(z.string().min(1, { message: 'Course anchor cannot be empty' }))
          .min(1, { message: 'At least one course anchor is required' }),
        attendees: z.array(z.string()).min(1, { message: 'At least one attendee is required' }).optional(),
      })
    )
    .min(1, { message: 'At least one meeting subject is required' }),
});

export type MasterFormReq = z.infer<typeof meetingSchema>;