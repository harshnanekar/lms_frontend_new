export type CkEditorInstanceType = {
    setData: (arg0: string) => void;
    model: { document: { on: (arg0: string, arg1: () => void) => void } };
    getData: () => any;
    destroy: () => void;
} | null | undefined