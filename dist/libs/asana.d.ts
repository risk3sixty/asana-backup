export default function AsanaClient(accessToken?: string | undefined): {
    client: import("axios").AxiosInstance;
    getWorkspaces(): Promise<any>;
    getFullExport(orgId: string): Promise<any>;
};
