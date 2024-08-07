<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchApi } from '$lib/utils/fetcher';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	
	import { Header, Sidebar } from '$lib/components/layout';

	let profilData:any;
	$: console.log("profilData::::::::::::",profilData);

	onMount( async () =>{
		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/profile`,
			method: 'GET'
		});
		console.log("::::::::::::::::::::::::::::::",JSON.stringify(json));
		profilData = await json;
	})

</script>

<head>
	<title>Research</title>
</head>

<Sidebar />
<main class="transition-all md:ml-[62px] lg:ml-[260px]">
	<Header {profilData}/>
	<main
		id="lms-main-wrapper"
		class="small-scrollbar relative overflow-y-auto overflow-x-hidden bg-white px-[13px] py-[22px] md:rounded-tl-[20px] md:p-[30px]"
	>
		<slot />
	</main>
</main>
