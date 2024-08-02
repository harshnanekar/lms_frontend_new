<script lang="ts">
	import { Input, DatePicker, DynamicSelect ,File} from '$lib/components/ui';
	import { SelectDateIcon, XIcon } from '$lib/components/icons';
	import { formatDateTimeShort, formatDate } from '$lib/utils/date-formatter';
	import { tooltip } from '$lib/utils/tooltip';
	import { fly } from 'svelte/transition';
	import { Card } from '$lib/components/ui';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { PUBLIC_API_BASE_URL, PUBLIC_BASE_URL } from '$env/static/public';
	import { fetchApi, fetchFormApi } from '$lib/utils/fetcher';
	import { validateWithZod } from '$lib/utils/validations';
	import { EContentObj, type EContentReq } from '$lib/schemas/modules/research/master-validations';

	let title = 'E-Content Development';
	let files : any = [];

	let publicationDate: Date | null = new Date();
	publicationDate = null;
	$: publicationFormattedDate = publicationDate;
	function handleDateChange(e: CustomEvent<any>) {
		if (!publicationDate) return;
		publicationFormattedDate = publicationDate;
	}

	let obj : any= {
		faculty_name: '',
		module: '',
		module_platform: '',
		document_link: '',
		media_link: '',
		facility_list: '',
		launching_date: publicationFormattedDate != null ? formatDate(publicationFormattedDate) : ''
	};

	async function handleSubmit() {
		let EContent: EContentReq = {
			faculty_name: obj.faculty_name,
			module: obj.module,
			module_platform: obj.module_platform,
			document_link: obj.document_link,
			media_link: obj.media_link,
			facility_list: obj.faculty_name,
			launching_date: publicationFormattedDate != null ? formatDate(publicationFormattedDate) : ''
		};

		const result = validateWithZod(EContentObj, EContent);

		if (result.errors) {
			console.log(result.errors);
			const [firstPath, firstMessage] = Object.entries(result.errors)[0];
			toast.error('ALERT!', {
				description: firstMessage
			});
			return;
		}

		console.log('validated data', JSON.stringify(result.data));

		const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/insert-e-content`,
			method: 'POST',
			body: {
				e_content: result.data
			}
		});

		if (error) {
			console.log('error json ',JSON.stringify(error))
			
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}

		console.log('json ', JSON.stringify(json));

			toast.success('Inserted Successfully');
			publicationFormattedDate = null;
			clearForm();
			goto(`${PUBLIC_BASE_URL}e-content`);
	}

	function clearForm() {
		obj = {
			faculty_name: '',
			module: '',
			module_platform: '',
			document_link: '',
			media_link: '',
			facility_list: ''
		};
		publicationDate = null;
	}


</script>

<Card {title}>
	<div class="modal-content p-4">
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Name Of Faculty" bind:value={obj.faculty_name} />
			<Input type="text" placeholder="Name of the module developed" bind:value={obj.module} />
			<Input
				type="text"
				placeholder="Platform on which module is developed"
				bind:value={obj.module_platform}
			/>
		</div>
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input
				type="text"
				placeholder="Link to relevant document and facility available in institution"
				bind:value={obj.document_link}
			/>
			<Input
				type="text"
				placeholder="List of the e-content development facility available"
				bind:value={obj.facility_list}
			/>
			<Input
				type="text"
				placeholder="Provide link to videos of media centre and recording facility"
				bind:value={obj.media_link}
			/>
		</div>
		<div class="mt-4 flex gap-4 md:flex-row">
			<DatePicker
				on:change={handleDateChange}
				bind:selectedDateTime={publicationDate}
				disabled={(publicationDate) => publicationDate.getTime() < new Date().setHours(0, 0, 0, 0)}
			>
				<div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
					<SelectDateIcon />
					<span class="text-body-2 font-bold">Add Launching Date</span>
				</div>
			</DatePicker>
			{#if publicationFormattedDate}
				{@const formattedDate = formatDateTimeShort(new Date(publicationFormattedDate))}
				<div
					class="bg-base text-label-md md:text-body-2 mr-3 flex items-center gap-x-4 rounded-3xl px-4 py-1 font-medium text-black md:py-3"
					in:fly={{ x: -100, duration: 300 }}
					out:fly={{ x: 100, duration: 300 }}
				>
					<p class="m-0 p-0">{formattedDate}</p>
					<button
						use:tooltip={{
							content: `<b class="text-primary">REMOVE</b> ${formattedDate}`
						}}
						on:click={() => {
							// remove the current date
							publicationFormattedDate = null;
						}}
					>
						<XIcon />
					</button>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<button class="lms-btn lms-secondary-btn" on:click={clearForm}>Clear Form</button>
		<button class="lms-btn lms-primary-btn" on:click={handleSubmit}>Submit</button>
	</div>
</Card>
