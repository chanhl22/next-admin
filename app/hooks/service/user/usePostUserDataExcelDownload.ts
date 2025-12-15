import { usePostMutation } from "@/app/api/utility/api";

interface PostUserDataExcelDownloadRequest {
    excelDownType?: string;
    userNo?: number;
    searchUserGrade?: string;
    searchTendencyNo?: number;
    searchType?: string;
    searchValue?: string;
    maskingOption?: string;
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;
}

export const usePostUserDataExcelDownload = () => {
    return usePostMutation<PostUserDataExcelDownloadRequest, Blob>(
        '/user/downUserDataExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        }
    );
};
