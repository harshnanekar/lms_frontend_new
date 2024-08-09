<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  
    let editorElement: HTMLTextAreaElement;
    let editorInstance: { setData: (arg0: string) => void; model: { document: { on: (arg0: string, arg1: () => void) => void; }; }; getData: () => any; destroy: () => void; } | null;
    const dispatch = createEventDispatcher();
  
    export let value = '';
    export let config = {};
  
    onMount(async () => {
      if (typeof window !== 'undefined') {
        const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
  
        try {
          editorInstance = await ClassicEditor.create(editorElement, config);
          editorInstance.setData(value);
  
          editorInstance.model.document.on('change:data', () => {
            const newValue = editorInstance.getData();
            dispatch('change', { detail: newValue });
          });
        } catch (error) {
          console.error('There was a problem initializing CKEditor:', error);
        }
      }
    });
  
    onDestroy(() => {
      if (editorInstance) {
        editorInstance.destroy();
        editorInstance = null;
      }
    });
  </script>
  
  <textarea bind:this={editorElement}></textarea>
  
  <style>
    textarea {
      display: none;
    }
  </style>
  