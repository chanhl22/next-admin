import { useGetQuery } from "@/app/api/utility/api";

interface PostCurationListRequest {
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

export const useGetCurationList = (param: PostCurationListRequest = {}) => {
    return useGetQuery(
        ['etCurationList', param],
        '/community/getCurationList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
