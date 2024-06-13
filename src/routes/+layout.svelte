<script>
	import { Header, Sidebar } from '$lib/components/layout';
	import '../app.css';
</script>

<head>
	<title>LMS</title>
</head>

<Sidebar />
<main class="ml-[260px]">
	<Header />
	<main id="lms-main" class="px-[30px] py-[22px] rounded-tl-[20px] bg-white overflow-y-auto">
		<slot />
	</main>
</main>

<style>
	#lms-main {
		min-height: calc(100vh - 60px);
	}
</style>
