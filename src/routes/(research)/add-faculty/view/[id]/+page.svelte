<script lang="ts">
	import { Input, DatePicker } from '$lib/components/ui';
	import { Card } from '$lib/components/ui';

    export let data : any;
    
    let disabled : boolean =  true;
    let title = 'Faculty Details'
    let checkData = data.facultyData.length > 0 ? true : false;

    let obj = {
      first_name : checkData && data.facultyData[0].first_name ?  data.facultyData[0].first_name : '',
      last_name : checkData && data.facultyData[0].last_name ?  data.facultyData[0].last_name : '',
      username : checkData && data.facultyData[0].username ?  data.facultyData[0].username : '',
      institute : checkData && data.facultyData[0].institute_name ?  data.facultyData[0].institute_name : '',
      address : checkData && data.facultyData[0].address ?  data.facultyData[0].address : '',
      designation : checkData && data.facultyData[0].designation ?  data.facultyData[0].designation : '',
      faculty_type : checkData && data.facultyData[0].faculty_type ?  data.facultyData[0].faculty_type : '',
    }

   

</script>    

{#if checkData}
<Card {title} >
    <div class="modal-content p-4">
		<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      <Input type="text" placeholder="Firstname" value={obj.first_name} {disabled}/>
			<Input type="text" placeholder="Lastname" value={obj.last_name} {disabled}/>
			<Input type="text" placeholder="Username" value={obj.username} {disabled}/>
        </div>
        <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Institute" value={obj.institute} {disabled}/>
			<Input type="text" placeholder="Address" value={obj.address} {disabled}/>
			<Input type="text" placeholder="Designation" value={obj.designation} {disabled}/>
        </div>
        <div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			<Input type="text" placeholder="Faculty Type" value={obj.faculty_type} {disabled}/>
        </div>
    </div>
</Card>
{:else}
<p>No Data Found !</p>
{/if}