import { usePostMutation } from "@/app/api/utility/api";

interface PostSurveyDataExcelDownloadRequest {
    excelDownYn?: string;
    searchMainCategoryNo?: string;
    searchSubCategoryNo?: number;
    searchType?: string;
    searchValue?: string;
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;
}

export const usePostSurveyDataExcelDownload = () => {
    return usePostMutation<PostSurveyDataExcelDownloadRequest, Blob>(
        '/service/downSurveyDataExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        }
    );
};
