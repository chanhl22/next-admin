import { usePostMutation } from "@/app/api/utility/api";

interface PostPointDataExcelDownloadRequest {
    excelDownType?: string;
    maskingOption?: string;
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;
    searchStartDt?: string;
    searchEndDt?: string;
    searchPointType?: string;
    searchType?: string;
    searchValue?: string;
}

export const usePostPointDataExcelDownload  = () => {
    return usePostMutation<PostPointDataExcelDownloadRequest, Blob>(
        '/reward/downPointDataExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        }
    );
};
