import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemSalesHistoryListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchStartDt?: string;
    searchEndDt?: string;
    searchStatus?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetPointItemSalesHistoryList = (param: PostPointItemSalesHistoryListRequest = {}) => {
    return useGetQuery(
        ['getPointItemSalesHistoryList', param],
        '/reward/getPointItemSalesHistoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
