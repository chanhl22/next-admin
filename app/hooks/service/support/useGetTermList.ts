import { useGetQuery } from "@/app/api/utility/api";

interface PostTermListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchTermType?: string;
    searchTermStatusType?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetTermList = (param: PostTermListRequest = {}) => {
    return useGetQuery(
        ['getTermList', param],
        '/support/getTermList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
