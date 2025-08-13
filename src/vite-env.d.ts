/// <reference types="vite/client" />
export {};

declare global {
    interface Window {
    electronAPI: {
        selectFolder: () => Promise<string | null>;
        sortFolder: ( folderUrl: string, groupOptions: { name: string; value: string }[], optionIndex: number, cleanName: boolean
            ) => Promise<string>;
        };
    }
    interface File {
    path: string;
    }
}
