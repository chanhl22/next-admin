import { usePostMutation } from "@/app/api/utility/api";

interface PostEventDataExcelDownloadRequest {
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;
    searchStartDt?: string;
    searchEndDt?: string;
    searchLangType?: string;
    searchEventStatusType?: string;
    searchRegStartDt?: string;
    searchRegEndDt?: string;
}

export const usePostEventDataExcelDownload = () => {
    return usePostMutation<PostEventDataExcelDownloadRequest, Blob>(
        '/reward/downEventDataExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        }
    );
};