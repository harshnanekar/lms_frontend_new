<script lang="ts">

	import { MenuBarIcon, SearchIcon, SignOutIcon } from '../icons';
	import { isSidebarOverlayOpen } from './sidebar/store';
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
	
			<div>
				<p class="rollusername">
					{#if profilData[0].first_name!=null && profilData[0].last_name != null}
					{profilData[0].first_name} {profilData[0].last_name}
					{:else}
                    User
					{/if}
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