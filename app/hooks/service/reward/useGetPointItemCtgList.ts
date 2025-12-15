import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemCtgListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchType?: string;
    searchValue?: string;
    pagingType?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetPointItemCtgList  = (param: PostPointItemCtgListRequest = {}) => {
    return useGetQuery(
        ['getPointMallCtgList', param],
        '/reward/getPointItemCtgList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
