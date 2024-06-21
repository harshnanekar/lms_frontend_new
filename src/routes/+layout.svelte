<script>
	import { Header, Sidebar } from '$lib/components/layout';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<head>
	<title>LMS</title>
</head>

<Toaster
	richColors
	duration={5000000}
	theme="light"
	closeButton
	toastOptions={{
		cancelButtonStyle: '!bg-white',
		classes: {
			description: 'md:!text-body-2',
			title: "md:!text-xl",
		}
	}}
/>
<Sidebar />
<main class="transition-all md:ml-[62px] lg:ml-[260px]">
	<Header />
	<main
		id="lms-main-wrapper"
		class="small-scrollbar relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:rounded-tl-[20px] md:p-[30px]"
	>
		<slot />
	</main>
</main>
