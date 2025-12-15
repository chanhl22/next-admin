import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsReportListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchProcType?: string;
    searchTargetType?: string;
    searchReportType?: string;
    searchReportProcReasonType?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetContentsReportList = (param: PostContentsReportListRequest = {}) => {
    return useGetQuery(
        ['getContentsReportList', param],
        '/community/getContentsReportList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
