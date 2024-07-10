<!-- <script lang="ts">
	import { Card, Input } from "$lib/components/ui";
   let title = 'Teaching Excellance';
   let disabled : boolean = true;

   function downloadFiles(){
    console.log("Download files");
   }


</script> -->
<!-- <Card {title}>
    <div class="p-4">
        <div class="scroll small-scrollbar modal-content max-h-[70vh] min-h-[50vh] overflow-auto">
            Adjust max-height as needed -->
            <!-- <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Pedagogy Innovation" value={}  {disabled} />
                <Input type="text" placeholder="Link" value={} {disabled} />
                <div class="lms-input-container flex flex-row gap-2">
                    <input
                        id="documents"
                        class="lms-input"
                        placeholder=""
                        value={}
                        {disabled}
                    />
                    <label for="documents" class="lms-placeholder"
                        >Pedagogy Innovation File
                        <span>*</span>
                    </label>
                    <button class="lms-btn lms-primary-btn" on:click={downLoadFiles}
                        ><i class="fa-solid fa-download text-lg"></i></button
                    >
                </div>
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Policy Cadre" value={obj.policy_cadre} {disabled} />
                <Input type="text" placeholder="Name Of All Authors" value={obj.all_authors} {disabled} />
                <Input
                    type="number"
                    placeholder="Total No. Of Authors"
                    value={obj.total_authors}
                    {disabled}
                />
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input
                    type="text"
                    placeholder="Name Of Nmims Authors"
                    value={obj.nmims_authors}
                    {disabled}
                />
                <Input
                    type="text"
                    placeholder="No. Of Nmims Authors"
                    value={obj.nmims_author_count}
                    {disabled}
                />
                <Input type="text" placeholder="Journal Name" value={obj.journal_name} {disabled} />
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="UID" value={obj.uid} {disabled} />
                <Input type="text" placeholder="Publisher" value={obj.publisher} {disabled} />
                <Input
                    type="text"
                    placeholder="Names Of Other-Authors"
                    value={obj.other_authors}
                    {disabled}
                />
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Vol,Issue,Page No." value={obj.page_no} {disabled} />
                <Input type="text" placeholder="ISSN No." value={obj.issn_no} {disabled} />
                <Input
                    type="number"
                    placeholder="Scopus Site Score"
                    value={obj.scopus_site_score}
                    {disabled}
                />
            </div>
            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input
                    type="number"
                    placeholder="Impact factor by Clarivate Analytics"
                    value={obj.impact_factor}
                    {disabled}
                />
                <Input type="text" placeholder="WebLink /DOI No." value={obj.doi_no} {disabled} />
                <Input type="text" placeholder="Title Of Paper" value={obj.title} {disabled} />
            </div>

            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="GS Indexed" value={obj.gs_indexed} {disabled} />
                <div class="ml-2">
                    <label class="text-sm text-[#888888]"
                        >International/National Journal<span class="text-danger text-sm">*</span></label
                    >
                    <div class="mt-2.5 flex flex-row gap-[20px]">
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="international"
                                class="lms-input-radio w-4"
                                name="nationality"
                                value={1}
                                checked={obj.journal_type === 1}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">International</span>
                        </div>
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="national"
                                class="lms-input-radio w-4"
                                name="nationality"
                                value={2}
                                checked={obj.journal_type === 2}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">National</span>
                        </div>
                    </div>
                </div>
                <div class="ml-2">
                    <label class="text-sm text-[#888888]"
                        >Wos Indexed<span class="text-danger text-sm">*</span></label
                    >
                    <div class="mt-2 flex flex-row gap-[20px]">
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="wosYes"
                                class="lms-input-radio w-4"
                                name="wosIndexed"
                                value={true}
                                checked={obj.wos_indexed === true}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">Yes</span>
                        </div>
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="wosNo"
                                class="lms-input-radio w-4"
                                name="wosIndexed"
                                value={false}
                                checked={obj.wos_indexed === false}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">No</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Abdc Indexed" value={obj.abdc_indexed} {disabled} />
                <div class="ml-2">
                    <label class="text-sm text-[#888888]"
                        >UGC Indexed<span class="text-danger text-sm">*</span></label
                    >
                    <div class="mt-2 flex flex-row gap-[20px]">
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="ugcYes"
                                class="lms-input-radio w-4"
                                name="ugcIndexed"
                                value={true}
                                checked={obj.ugc_indexed === true}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">Yes</span>
                        </div>
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="ugcNo"
                                class="lms-input-radio w-4"
                                name="ugcIndexed"
                                value={false}
                                checked={obj.ugc_indexed === false}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">No</span>
                        </div>
                    </div>
                </div>
                <Input type="text" placeholder="Paper Type" value={obj.paper_type} {disabled} />
            </div>

            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input type="text" placeholder="Foreign Authors" value={obj.foreign_authors} {disabled} />
                <Input
                    type="number"
                    placeholder="No. Of Foreign Authors"
                    value={obj.foreign_authors_count}
                    {disabled}
                />
                <Input type="text" placeholder="Student Authors" value={obj.student_authors} {disabled} />
            </div>

            <div class="grid grid-cols-3 gap-[40px] p-4">
                <Input
                    type="text"
                    placeholder="No. Of Student Authors"
                    value={obj.student_authors_count}
                    {disabled}
                />

                -scopus-->
                <!-- <div class="ml-2">
                    <label class="text-sm text-[#888888]"
                        >Scopus Site Indexed<span class="text-danger text-sm">*</span></label
                    >
                    <div class="mt-2 flex flex-row gap-[20px]">
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="scsYes"
                                class="lms-input-radio w-4 accent-[#FF0000]"
                                name="scsIndexed"
                                value={true}
                                checked={obj.scs_indexed === true}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">Yes</span>
                        </div>
                        <div class="flex flex-row">
                            <input
                                type="radio"
                                id="scsNo"
                                class="lms-input-radio w-4 accent-[#FF0000]"
                                name="scsIndexed"
                                value={false}
                                checked={obj.scs_indexed === false}
                                {disabled}
                            />
                            <span class="text-sm text-[#888888]">No</span>
                        </div>
                    </div>
                </div>

                <div class="lms-input-container flex flex-row gap-2">
                    <input
                        id="documents"
                        class="lms-input"
                        placeholder=""
                        value={obj.filename}
                        {disabled}
                    />
                    <label for="documents" class="lms-placeholder"
                        >Supporting Documents
                        <span>*</span>
                    </label>
                    <button class="lms-btn lms-primary-btn" on:click={downLoadFiles}
                        ><i class="fa-solid fa-download text-lg"></i></button
                    >
                </div>
            </div>

            <div class="flex flex-row gap-[40px] p-4">
                <div class="text-primary hover:bg-base flex items-center gap-x-3 rounded-lg px-3 py-2">
                    <SelectDateIcon />
                    <span class="text-body-2 font-bold">Publication Date</span>
                </div>
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
                        >
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</Card> -->