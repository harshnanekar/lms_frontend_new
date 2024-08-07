<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
</script>

<div class="relative flex h-screen w-screen items-center justify-center bg-white">
    <h1
        class="text-primary absolute inset-0 z-10 m-0 flex justify-center p-0 text-[50vw] font-bold opacity-10 md:items-center lg:text-[30vw]"
    >
        {$page.status}
    </h1>
    <div class="relative z-20 p-6 text-center">
        <div class="relative rounded-lg p-6">
            <div class="flex aspect-square max-w-[600px] items-center justify-center">
                <img src="/images/layout/error.png" class="h-full w-full" alt="Error" />
            </div>
            <h1 class="text-primary mt-6 text-4xl font-bold">
                {$page.status}
            </h1>
            <p class="mt-2 text-lg text-gray-700">
                {$page.error?.message || 'Oops! Something went wrong.'}
            </p>
            <button
                on:click={() => history.state?.from ? history.back() : goto(`${PUBLIC_BASE_URL}dashboard`)}
                class="bg-primary my-6 rounded-lg px-4 py-2 font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-75"
            >
                Go Back Home
            </button>
        </div>
    </div>
</div>