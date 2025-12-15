import { usePostMutation } from "@/app/api/utility/api";

interface PostPointItemDataExcelDownloadRequest {
    excelDownType?: string;
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;

    searchType?: string;
    searchValue?: string;

    searchBrand?: string;
    searchStatus?: string;
    searchUserName?: string;
}

export const usePostPointItemDataExcelDownload  = () => {
    return usePostMutation<PostPointItemDataExcelDownloadRequest, Blob>(
        '/reward/downPointItemDataExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        }
    );
};
