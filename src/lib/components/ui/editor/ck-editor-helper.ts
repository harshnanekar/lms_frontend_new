// src/lib/editor/ch-editor-helper.ts

export function initializeCustomToolbar(editorInstance : any) {
    // Custom logic to initialize a toolbar button or other editor settings
    console.log('Initializing custom toolbar...');
    // Add custom logic here
  }
  
  export function addTimestampButton(editorInstance : any) {
    const toolbarElement = editorInstance.ui.view.toolbar.element;
  
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Insert Timestamp';
    buttonElement.onclick = () => {
      const timestamp = new Date().toLocaleString();
      editorInstance.model.change((writer: { createText: (arg0: string) => any; }) => {
        editorInstance.model.insertContent(writer.createText(`\nTimestamp: ${timestamp}\n`));
      });
    };
  
    toolbarElement.appendChild(buttonElement);
  }
  