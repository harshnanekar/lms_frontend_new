<script lang="ts">
import { Input } from "$lib/components/ui";
import { validateWithZod } from '$lib/utils/validations';
import { loginCredentials, type loginReq } from '$lib/schemas/modules/research/master-validations';
import { toast } from "svelte-sonner";
import { PUBLIC_API_BASE_URL } from "$env/static/public";
import { fetchApi } from "$lib/utils/fetcher";
import { goto } from "$app/navigation";

let isLoading = false;
let username : any;
let password : any;    

async function handleSubmit() {
  console.log('username password ',username,password)  
  let obj : loginReq = {
   username : username ?? '',
   password : password ?? ''
  }

  const result = validateWithZod(loginCredentials, obj);

  if (result.errors) {
    console.log(result.errors);
    const [firstPath, firstMessage] = Object.entries(result.errors)[0];
    toast.error('ALERT!', {
        description: firstMessage
    });
    return;
  }

  const { error, json } = await fetchApi({
			url: `${PUBLIC_API_BASE_URL}/verify-login`,
			method: 'POST',
			body: {
				login_data : result.data
			}
		});

		if (error) {
			toast.error(error.message || 'Something went wrong!', {
				description: error.errorId ? `ERROR-ID: ${error.errorId}` : ''
			});
			return;
		}
        if(json.status !== 200){
            toast.error(json.message);
        }
        goto('/v2/dashboard')
    }

</script>

<div class="fixed -z-10 flex h-screen w-screen md:hidden">
    <div class="h-screen flex-1 bg-[#FoF5FF]"></div>
    <div class="h-screen flex-1 bg-[#93ACE6]"></div>
</div>
<div
    class="login-wrapper grid min-h-screen grid-cols-10 overflow-y-auto bg-transparent sm:h-auto md:h-screen md:!max-h-[800px] md:bg-white md:p-[30px] xl:p-[70px]"
>
    <div class="left-box order-2 col-span-full mx-auto w-[90%] md:order-1 md:col-span-4 md:w-[75%]">
        <img
            src="/images/auth/login/nmims-logo.png"
            alt="Svkm Logo"
            class="hidden h-[80px] w-[220px] md:inline-block"
        />
        <form on:submit={handleSubmit} class="login-form-wrapper mt-12">
            <h4 class="text-heading-2.5 md:text-heading-1 font-bold">Login</h4>
            <p class="text-label-md md:text-label-lg text-[##666666]">
                Login using credentials provided by the University
            </p>
            <div class="mt-8 space-y-8">
                <Input
                    inputClass="rounded-[14px]"
                    placeholder="Username"
                    isRequired
                    bind:value={username}
                />
                <Input
                    inputClass="rounded-[14px]"
                    placeholder="Password"
                    type="password"
                    isRequired
                    bind:value={password}
                />
                <button
                    disabled={isLoading}
                    class="lms-btn w-full rounded-2xl bg-[#D2232A] py-4 text-center text-white"
                >
                    Login
                </button>
            </div>
        </form>

        <div class="mt-4 text-center md:mt-8">
            <a
                href="http://uat.svkm.ac.in/forgot-password-svkm"
                class="text-label-md md:text-label-lg text-[15px] font-bold text-[#D2232A]"
            >
                Forgot Password 
            </a>
        </div>

        <div class="text-label-md md:text-label-lg mt-4 text-center md:mt-8">
            <p class="font-bold">For admission related or general queries kindly visit:</p>
            NMIMS : <a href="https://www.nmims.edu/admissions/"><u> www.nmims.edu/admissions</u></a><br />
            SVKM : <a href="https://svkm.ac.in/"><u> svkm.ac.in</u></a>
        </div>
    </div>
    <div
        class="right-box order-1 col-span-full flex justify-center bg-contain md:order-2 md:col-span-6 md:rounded-[70px] xl:bg-cover"
    >
        <img
            src="/images/auth/login/nmims-logo.png"
            alt="Svkm Logo"
            class="mt-10 h-[80px] w-[220px] md:hidden"
        />
    </div>
</div>

<style>
    .right-box {
        background-image: url('/images/auth/login/nmims-logo-lg-bg.png');
        background-position: center;
        background-repeat: no-repeat;
        background-color: #90aae4;
    }

    @media screen and (max-width: 767px) {
        .right-box {
            background-image: url('/images/auth/login/nmims-login-sm-bg.png');
            background-color: transparent;
            max-height: 50vh;
            min-height: 35vh;
        }
    }

</style>    