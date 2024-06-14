export const SIDEBAR_URL = [
	{
		url: '',
		icon: 'dashboard',
		label: 'Home',
		module: null,
		child: []
	},
	{
		url: '#1',
		icon: 'dashboard2',
		label: 'Dashboard',
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
			}
		]
	}
];

export let obj = [
	{
		meeting_id: '1',
		meeting_name: 'Meeting 1',
		meeting_date: '2021-01-01',
		acad_session: 'Session 1',
		status: 'Scheduled'
	},
	{
		meeting_id: '2',
		meeting_name: 'Meeting 2',
		meeting_date: '2021-01-02',
		acad_session: 'Session 1',
		status: 'Scheduled'
	}
];

export const headers = [
	{
		label: 'MID',
		key: 'meeting_id',
		sortable: true,
		addclass: true
	},
	{
		label: 'Meeting Name',
		key: 'meeting_name',
		sortable: true,
		addclass: true
	},
	{
		label: 'Meeting Date',
		key: 'meeting_date',
		sortable: true,
		addclass: true
	},
	{
		label: 'Acad Session',
		key: 'acad_session',
		sortable: true,
		addclass: true
	},
	{
		label: 'Status',
		key: 'status',
		sortable: true,
		addclass: true
	},
	{
		label: 'Action',
		key: 'action',
		sortable: false,
		addclass: false
	}
];
