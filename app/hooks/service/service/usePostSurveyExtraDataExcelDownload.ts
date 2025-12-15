import { usePostMutation } from "@/app/api/utility/api";

interface PostSurveyExtraDataExcelDownloadRequest {
    extraNo?: number;
    searchMainCategoryNo?: string;
    searchSubCategoryNo?: number;
    searchType?: string;
    searchValue?: string;
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;
}

export const usePostSurveyExtraDataExcelDownload = () => {
    return usePostMutation<PostSurveyExtraDataExcelDownloadRequest, Blob>(
        '/service/downSurveyExtraDataExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
        }
    );
};
