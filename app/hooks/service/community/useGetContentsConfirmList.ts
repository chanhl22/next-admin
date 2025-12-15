import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsConfirmListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchProcType?: string;
    searchTargetType?: string;
    searchReportType?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetContentsConfirmList = (param: PostContentsConfirmListRequest = {}) => {
    return useGetQuery(
        ['getContentsConfirmList', param],
        '/community/getContentsConfirmList',
        param,
        {
            staleTime: 0, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
