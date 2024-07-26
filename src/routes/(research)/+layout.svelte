<script lang="ts">
	
	import { Header, Sidebar } from '$lib/components/layout';

</script>

<head>
	<title>Research</title>
</head>

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
