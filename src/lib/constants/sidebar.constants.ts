import { AddCardIcon, AnalyticsIcon, DashboardIcon, KeyNotesIcon, MultiUsersIcon, PlusIcon, StackIcon, UsersIcon } from "$lib/components/icons";

type SidebarIcon = {
    [key: string]: unknown;
}

export const SIDEBAR_ICON: SidebarIcon = {
    'plus': PlusIcon,
    'dashboard': DashboardIcon,
    'analytics': AnalyticsIcon,
    'users': UsersIcon,
    'keynotes': KeyNotesIcon,
    'multiusers': MultiUsersIcon,
    'addcard': AddCardIcon,
    'stack': StackIcon
}