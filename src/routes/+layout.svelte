<script>
	import { Header, Sidebar } from '$lib/components/layout';
	import '../app.css';
</script>

<head>
	<title>LMS</title>
</head>

<Sidebar />
<main class="md:ml-[62px] lg:ml-[260px] transition-all">
	<Header />
	<main
		id="lms-main-wrapper"
		class="relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:px-[30px] md:rounded-tl-[20px]"
	>
		<slot />
	</main>
</main>
