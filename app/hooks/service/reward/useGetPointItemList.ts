import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchSaleStatus?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetPointItemList = (param: PostPointItemListRequest = {}) => {
    return useGetQuery(
        ['getPointItemList', param],
        '/reward/getPointItemList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
