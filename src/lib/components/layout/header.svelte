<script>
	import { MenuBarIcon, SearchIcon } from '../icons';
	import { Image } from '../ui';
	import { isSidebarOverlayOpen } from './sidebar/store';
</script>

<header id="lms-header" class="relative bg-base z-[99999]">
	<div class="flex h-[60px] items-center justify-between px-[28px] py-[8px]">
		<div class="hidden items-center gap-x-[10px] lg:flex">
			<p class="text-body-2 font-bold">School of Business Management</p>
			<button class="cursor-pointer text-label-md font-semibold text-primary">Change</button>
		</div>
		<div class="md:hidden">
			<button on:click|stopPropagation={() => ($isSidebarOverlayOpen = !$isSidebarOverlayOpen)}>
				<MenuBarIcon />
			</button>
		</div>
		<div class="hidden md:block lg:hidden">
			<img src="images/layout/logo.png" alt="Logo" class="h-[36px] w-[102px]" />
		</div>
		<div class="flex items-center gap-x-4 md:gap-x-6">
			<div class="relative">
				<input
					type="text"
					placeholder="Search here..."
					class="hidden w-64 rounded-full border py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:block"
				/>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<SearchIcon />
				</div>
			</div>
			<button>
				<Image
					src="icons/layout/notification.png"
					name="Notification"
					classes="w-6 h-6 rounded-full"
				/>
			</button>
			<div>
				<Image
					src="icons/layout/notificataion.png"
					name="Notification"
					classes="w-10 h-10 rounded-full"
				/>
			</div>
		</div>
	</div>
</header>
