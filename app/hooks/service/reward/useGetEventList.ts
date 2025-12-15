import { useGetQuery } from "@/app/api/utility/api";

interface PostEventListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchLangType?: string;
    searchEventStatusType?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetEventList = (param: PostEventListRequest = {}) => {
    return useGetQuery(
        ['getEventList', param],
        '/reward/getEventList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

