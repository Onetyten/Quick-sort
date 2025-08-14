/// <reference types="vite/client" />
export {};

declare global {
    interface SortFolderResult {
        name: string;
        log: string[];
        foldersCreated: number;
    }
    interface Window {
    electronAPI: {
        selectFolder: () => Promise<string | null>;
        sortFolder: ( folderUrl: string, groupOptions: { name: string; value: string }[], optionIndex: number, cleanName: boolean
        ) => Promise<SortFolderResult>;

        };
    }
    interface File {
    path: string;
    }
}
