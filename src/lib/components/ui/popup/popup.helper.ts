import { confirmStore } from '$lib/stores/modules/research/master.store';
let resolveFunc: (value: boolean) => void;


export function showConfirmation(message: any) : Promise<any>{
    console.log('store clalled')
	confirmStore.set({
      isVisible: true,
      confirmText: message
    });

  
    return new Promise<boolean>((resolve) => {
        resolveFunc = resolve;
    });

}

