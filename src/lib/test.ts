import type { TableHeaders } from './types/layout/table';
import type { SubjectMeetingDetail } from './types/modules/mpc/master-form';

export const SIDEBAR_URL = [
	{
		url: '/',
		icon: 'dashboard',
		label: 'Home',
		module: null,
		child: []
	},
	{
		url: '/test',
		icon: 'test',
		label: 'Test',
		module: null,
		child: []
	},
	{
		url: '/page',
		icon: 'Mpc',
		label: 'Mpc',
		module: null,
		child: []
	},
	{
		url: '#2',
		icon: 'mpc',
		label: 'MPC',
		module: 'mpc',
		child: [
			{
				url: '#3',
				icon: 'overview',
				label: 'Overview',
				module: 'mpc',
				child: []
			},
			{
				url: '#4',
				icon: 'forecast',
				label: 'Forecast',
				module: 'mpc',
				child: []
			},
			{
				url: '#5',
				icon: 'plan',
				label: 'Plan',
				module: 'mpc',
				child: []
			},
			{
				url: '#6',
				icon: 'execute',
				label: 'Execute',
				module: 'mpc',
				child: []
			},
			{
				url: '#7',
				icon: 'monitor',
				label: 'Monitor',
				module: 'mpc',
				child: []
			},
			{
				url: '#8',
				icon: 'plan',
				label: 'Plan',
				module: 'mpc',
				child: []
			},
			{
				url: '#9',
				icon: 'execute',
				label: 'Execute',
				module: 'mpc',
				child: []
			},
			{
				url: '#10',
				icon: 'monitor',
				label: 'Monitor',
				module: 'mpc',
				child: []
			},
			{
				url: '#11',
				icon: 'plan',
				label: 'Plan',
				module: 'mpc',
				child: []
			},
			{
				url: '#12',
				icon: 'execute',
				label: 'Execute',
				module: 'mpc',
				child: []
			},
			{
				url: '#13',
				icon: 'monitor',
				label: 'Monitor',
				module: 'mpc',
				child: []
			}
		]
	}
];

export const obj = [
	{
		meeting_id: '1',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: 'Tri III, 2023',
		status: 'Completed',
		status_abbr: 'COMPLETED'
	},
	{
		meeting_id: '2',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: 'Tri III, 2023',
		status: 'Scheduled',
		status_abbr: 'SCHEDULED'
	},
	{
		meeting_id: '1',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: ' Tri III, 2023',
		status: 'Pending Form A',
		status_abbr: 'PENDING_FORMA'
	},
	{
		meeting_id: '2',
		meeting_name:
			'MBA - 8001 - Trimester III- Financial Analytics - 1 - 803AN2E001 (2023) E001 (2023)',
		meeting_date: '19 May’ 23, 11:32 AM',
		acad_session: 'Tri III, 2023',
		status: 'Pending Form-B',
		status_abbr: 'PENDING_FORMB'
	}
];

export const headers: TableHeaders<SubjectMeetingDetail>[] = [
	{
		label: 'MID',
		key: 'meeting_id',
		sortable: false,
		classes: 'id',
		showTooltip: false
	},
	{
		label: 'Meeting Name',
		key: 'meeting_name',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Meeting Date',
		key: 'meeting_date',
		sortable: false,
		classes: 'whitespace-nowrap',
		showTooltip: false
	},
	{
		label: 'Acad Session',
		key: 'acad_session',
		sortable: false,
		classes: '',
		showTooltip: false
	},
	{
		label: 'Status',
		key: 'status',
		sortable: false,
		classes: '',
		showTooltip: false
	}
];