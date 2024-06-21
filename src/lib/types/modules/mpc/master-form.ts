import type { CustomOptions } from '$lib/components/ui/select/helper.select';

export type MpcMasterList = {
	meeting_id: string;
	meeting_name: string;
	meeting_date: string;
	acad_session: string;
	status: string;
	status_abbr: string;
};

export type Anchor = {
	user_lid: number;
	full_name: string;
	username: string;
	avatar: string;
};


export type AnchorWithSelection = Anchor & {
	isSelected: boolean;
	isHidden?: boolean;
};

export type MeetingSubjectStore = {
	uid: string;
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
	acadYear: CustomOptions;
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