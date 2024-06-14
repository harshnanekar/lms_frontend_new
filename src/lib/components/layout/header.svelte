<script>
	import { MenuBarIcon } from '../icons';
	import { Image } from '../ui';
</script>

<header id="lms-header" class="flex h-[60px] items-center justify-between px-[28px] py-[8px]">
	<div class="hidden items-center gap-x-[10px] lg:flex">
		<p class="text-body-2 font-bold">School of Business Management</p>
		<button class="cursor-pointer text-label-md font-semibold text-primary">Change</button>
	</div>
	<div class="lg:hidden">
		<button>
			<MenuBarIcon />
		</button>
	</div>
	<div class="flex items-center gap-x-4 md:gap-x-6">
		<div class="relative">
			<input
				type="text"
				placeholder="Search here..."
				class="hidden w-64 rounded-full border py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:block"
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current text-slate-100"
				>
					<path
						d="M21.696 20.2168L16.7656 15.2662C18.0337 13.8136 18.7288 11.9747 18.7279 10.075C18.7279 5.62251 14.9757 2 10.3639 2C5.75214 2 2 5.62251 2 10.075C2 14.5275 5.75214 18.15 10.3639 18.15C12.0953 18.15 13.7451 17.6458 15.1557 16.6888L20.1236 21.677C20.3312 21.8852 20.6105 22 20.9098 22C21.1931 22 21.4618 21.8957 21.6658 21.7061C21.874 21.5123 21.9941 21.2467 21.9998 20.9675C22.0054 20.6883 21.8962 20.4184 21.696 20.2168ZM10.3639 4.10652C13.7728 4.10652 16.546 6.78391 16.546 10.075C16.546 13.3661 13.7728 16.0435 10.3639 16.0435C6.95509 16.0435 4.1819 13.3661 4.1819 10.075C4.1819 6.78391 6.95509 4.10652 10.3639 4.10652Z"
						fill="inherit"
					/>
				</svg>
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
</header>
