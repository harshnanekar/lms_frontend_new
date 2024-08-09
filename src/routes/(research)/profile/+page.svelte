<script lang="ts">
    import { Card, Input } from '$lib/components/ui';
    import { Button } from '$lib/components/ui/button';

    export let data:any;
    $:console.log("profileData:::::::::::::::::::::::::::0", data.data);
    
</script>

{#if data.data && data.data[0]}
    <Card title="Profile Details">
        <div class="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <Input disabled isRequired={false} placeholder="Username" value={data.data[0].username}/>
            <Input disabled isRequired={false} placeholder="Full Name" value={data.data[0].first_name}/>
            <Input disabled isRequired={false} placeholder="Email" value={data.data[0].email}/>
            <Input disabled isRequired={false} placeholder="Phone" value={data.data[0].mobile_no}/>
        </div>
    </Card>
{:else}
    <Card title="Profile Details">
        <div class="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <Input disabled isRequired={false} placeholder="Username Error"/>
            <Input disabled isRequired={false} placeholder="Full Name Error"/>
            <Input disabled isRequired={false} placeholder="Email Error"/>
            <Input disabled isRequired={false} placeholder="Phone Error"/>
        </div>
    </Card>
{/if}