<script>
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { fetchApi } from '$lib/utils/fetcher';
	import { toast } from 'svelte-sonner';
	import { MenuBarIcon, SearchIcon, SignOutIcon } from '../icons';
	import { Image, ProfileDropDown } from '../ui';
	import { isSidebarOverlayOpen } from './sidebar/store';
	import { goto } from '$app/navigation';
	// import type { UserSessionData } from '$lib/types/user';


	// export let userData: UserSessionData;

	// console.log('userData ===>>>>>', userData);
	
	async function getUserDetails(){
		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/user-details`,
			method: 'GET',
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        goto(`${PUBLIC_BASE_URL}login`);
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
			<button>
				<Image
					src="/icons/layout/notification.png"
					name="Notification"
					classes="w-6 h-6 rounded-full"
				/>
			</button>
			<div>
				<div>
					<!-- svelte-ignore missing-declaration -->
					<!-- <ProfileDropDown
						src="/icons/layout/notificataion.png"
						name={`${userData1.user_detail?.first_name} ${userData1.user_detail?.last_name}`}
						email={userData1.user_detail?.email}
					/> -->
				</div>
			</div>
		</div>
	</div>
</header>
