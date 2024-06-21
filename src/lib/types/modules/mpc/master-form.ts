import type { CustomOptions } from '$lib/components/ui/select/helper.select';

export type MpcMasterList = {
	meeting_id: string;
	meeting_name: string;
	meeting_date: string;
	acad_session: string;
	status: string;
	status_abbr: string;
};

export type MeetingSubjectReq = {
	campus_lid: string;
	program_lid: string;
	acad_session: string;
	subject_lid: string;
	program_anchor: string[];
	course_anchor: string[];
	attendees: string[];
	is_parent: boolean;
};

export type MasterMeetingReq = {
	meeting_name: string;
	acad_year: string;
	link_passowrd: string;
	meeting_date: Date[];
	meeting_subject: MeetingSubjectReq[];
};

export type MeetingRequestObject = {
	master_meeting: MasterMeetingReq;
};

export type Anchor = {
	user_lid: number;
	full_name: string;
	username: string;
	avatar: string;
};

export type MeetingSubjectStore = {
	campusOption: CustomOptions;
	programOption: CustomOptions;
	sessionOption: CustomOptions;
	subjectOption: CustomOptions;
	programAnchor: Anchor[];
	courseAnchor: Anchor[];
	attendees: Anchor[];
	isParent: boolean;
};

export type MasterMeetingStore = {
	meetingName: string;
	acadYear: string;
	linkPassword: string;
	meetingDate: Date[];
	meetingSubject: MeetingSubjectStore[];
};

export type SubjectMeetingDetail = {
	status: string;
	status_abbr: string;
	meeting_id: number;
	acad_session: string;
	meeting_date: string;
	meeting_name: string;
 };
 
 export type MeetingListItem = {
	program_id: number;
	subject_id: number;
	program_name: string;
	subject_name: string;
	subject_meeting_details: SubjectMeetingDetail[];
 };