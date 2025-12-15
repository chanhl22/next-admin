import { useGetQuery } from "@/app/api/utility/api";

interface PostCurationAllListRequest {
    pPostCategoryNo?: number;
    tabSearch?: string;
    searchSubCategoryNo?: number
    pageSize?: number;
    pageIndex?: number;
    statusType?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetCurationAllList = (param: PostCurationAllListRequest = {}) => {
    return useGetQuery(
        ['etCurationAllList', param],
        '/community/getCurationAllList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
