import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsListRequest {
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

export const useGetContentsList = (param: PostContentsListRequest = {}) => {
    return useGetQuery(
        ['getContentsList', param],
        '/community/getContentsList',
        param,
        {
            staleTime: 0, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
