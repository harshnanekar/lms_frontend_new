<script lang="ts">
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { fetchApi } from '$lib/utils/fetcher';
	import { toast } from 'svelte-sonner';
	import { MenuBarIcon, SearchIcon, SignOutIcon } from '../icons';
	import { Image, ProfileDropDown } from '../ui';
	import { isSidebarOverlayOpen } from './sidebar/store';
	import { goto } from '$app/navigation';
	import ProfileDropdown from '../ui/profile-dropdown.svelte';

	export let profilData:any;

	$:console.log("PROFILE DATA IN HEADER :::", profilData);
	
</script>


{#if profilData && profilData[0]}
<header id="lms-header" class="bg-base relative z-[99999]">
	<div class="flex h-[60px] items-center justify-between px-[28px] py-[8px]">
		<div class="hidden items-center gap-x-[10px] lg:flex"></div>
		<div class="md:hidden">
			<button on:click|stopPropagation={() => ($isSidebarOverlayOpen = !$isSidebarOverlayOpen)}>
				<MenuBarIcon />
			</button>
		</div>
		<div class="hidden md:block lg:hidden">
			<img src="/images/layout/logo.png" alt="Logo" class="h-[36px] w-[102px]" />
		</div>
		<div class="flex items-center gap-x-4 md:gap-x-6">
			<!-- <button on:click={() => window.history.back()}>Back</button> -->

			<!-- <button class="lms-btn lms-primary-btn"
				><SignOutIcon fill="white" />Signout</button
			> -->
			<!-- <button>
				<Image
					src="/icons/layout/notification.png"
					name="Notification"
					classes="w-6 h-6 rounded-full"
				/>
			</button> -->
			<div>
				<p class="rollusername">
					{profilData[0].first_name} {profilData[0].last_name}
				</p>
				<span class="userroll italic">
					{profilData[0].role_name}
				</span>
			</div>
			<div>
				
				<button class="border-0">
					<ProfileDropdown
						src="/icons/layout/notificataion.png"
						name={profilData[0]?.first_name}
						email={profilData[0]?.email}
						username={profilData[0]?.username}

					/>
					<!-- <Image
						src="/icons/layout/notificataion.png"
						name="Notification"
						classes="w-10 h-10 rounded-full"
					/> -->
				</button>
			</div>
		</div>
	</div>
	<div>
		
	</div>
</header>
{:else}
<header id="lms-header" class="bg-base relative z-[99999]">
	<div class="flex h-[60px] items-center justify-between px-[28px] py-[8px]">
		<div class="hidden items-center gap-x-[10px] lg:flex"></div>
		<div class="md:hidden">
			<button on:click|stopPropagation={() => ($isSidebarOverlayOpen = !$isSidebarOverlayOpen)}>
				<MenuBarIcon />
			</button>
		</div>
		<div class="hidden md:block lg:hidden">
			<img src="/images/layout/logo.png" alt="Logo" class="h-[36px] w-[102px]" />
		</div>
		<div class="flex items-center gap-x-4 md:gap-x-6">
			<div>
				<button class="border-0">
					<ProfileDropdown
						src="/icons/layout/notificataion.png"
						name='Name'
						email='xyz@email.com'
						username='USERNAME'

					/>
				</button>
			</div>
		</div>
	</div>
	<div>
		
	</div>
</header>
{/if}

<style>
	.rollusername{
		font-size: 14px;
            font-weight: 700;
            color: #333;
            line-height: 20px;
	}
	.userroll{
		    font-size: 14px;
            font-weight: 600;
            color: #7c8798;
            line-height: 16px;
            /* margin-left: 5px; */
			display:flex;
			justify-content: end;
	}
	</style>