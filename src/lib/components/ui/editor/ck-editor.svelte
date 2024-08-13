<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';


	let editorElement: HTMLDivElement;
	let editorInstance: {
		setData: (arg0: string) => void;
		model: { document: { on: (arg0: string, arg1: () => void) => void } };
		getData: () => any;
		destroy: () => void;
	} | null;
	const dispatch = createEventDispatcher();


	export let value = '';

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');

			try {
				editorInstance = await ClassicEditor.create(editorElement, {
					placeholder: 'Enter Content...',
					toolbar: {
						items: [
							'heading',
							'|',
							'bold',
							'italic',
							'strikethrough',
							'underline',
							'code',
							'subscript',
							'superscript',
							'removeFormat',
							'|',
							'bulletedList',
							'numberedList',
							'todoList',
							'|',
							'outdent',
							'indent',
							'|',
							'undo',
							'redo',
							'-',
							'fontSize',
							'fontFamily',
							'fontColor',
							'fontBackgroundColor',
							'highlight',
							'|',
							'alignment',
							'|',
							'link',
							'insertImage',
							'blockQuote',
							'insertTable',
							'specialCharacters',
							'horizontalLine',
							'pageBreak',
							'|',
							'textPartLanguage',
							'|',
							'findAndReplace',
							'imageTextAlternative',
              '|',
              'clear',
              'remove',
              'reset'
						]
					},
					table: {
						contentToolbar: [
							'insertTable',
							'tableColumn',
							'tableRow',
							'mergeTableCells',
							'tableProperties',
							'tableCellProperties',
							'toggleTableCaption'
						]
					},
					list: {
						properties: {
							styles: true,
							startIndex: true,
							reversed: true
						}
					},
					heading: {
						options: [
							{
								model: 'paragraph',
								title: 'Paragraph',
								class: 'ck-heading_paragraph'
							},
							{
								model: 'heading1',
								view: 'h1',
								title: 'Heading 1',
								class: 'ck-heading_heading1'
							},
							{
								model: 'heading2',
								view: 'h2',
								title: 'Heading 2',
								class: 'ck-heading_heading2'
							},
							{
								model: 'heading3',
								view: 'h3',
								title: 'Heading 3',
								class: 'ck-heading_heading3'
							},
							{
								model: 'heading4',
								view: 'h4',
								title: 'Heading 4',
								class: 'ck-heading_heading4'
							},
							{
								model: 'heading5',
								view: 'h5',
								title: 'Heading 5',
								class: 'ck-heading_heading5'
							},
							{
								model: 'heading6',
								view: 'h6',
								title: 'Heading 6',
								class: 'ck-heading_heading6'
							}
						]
					},
          menuBar: {
            isVisible: true,
          },
				});
				editorInstance?.setData(value);

				editorInstance?.model.document.on('change:data', () => {
					const newValue = editorInstance?.getData();
					value = newValue;
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

<div bind:this={editorElement} />

<style>
	:global(.ck-content) {
    min-height: 150px !important;
  }
</style>
