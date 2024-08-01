<script>
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { fetchApi } from '$lib/utils/fetcher';
	import { toast } from 'svelte-sonner';
	import { MenuBarIcon, SearchIcon, SignOutIcon } from '../icons';
	import { Image } from '../ui';
	import { isSidebarOverlayOpen } from './sidebar/store';
	import { goto } from '$app/navigation';

	async function handleLogout(){
		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/logout`,
			method: 'GET',
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        goto('/login');
	}
</script>

<header id="lms-header" class="relative z-[99999] bg-base">
	<div class="flex h-[60px] items-center justify-between px-[28px] py-[8px]">
		<div class="hidden items-center gap-x-[10px] lg:flex">
		</div>
		<div class="md:hidden">
			<button on:click|stopPropagation={() => ($isSidebarOverlayOpen = !$isSidebarOverlayOpen)}>
				<MenuBarIcon />
			</button>
		</div>
		<div class="hidden md:block lg:hidden">
			<img src="/images/layout/logo.png" alt="Logo" class="h-[36px] w-[102px]" />
		</div>
		<div class="flex items-center gap-x-4 md:gap-x-6">
			<button class="lms-btn lms-primary-btn" on:click={handleLogout}><SignOutIcon fill="white" />Signout</button>
			<button>
				<Image
					src="/icons/layout/notification.png"
					name="Notification"
					classes="w-6 h-6 rounded-full"
				/>
			</button>
			<div>
				<Image
					src="/icons/layout/notificataion.png"
					name="Notification"
					classes="w-10 h-10 rounded-full"
				/>
			</div>
		</div>
	</div>
</header>
