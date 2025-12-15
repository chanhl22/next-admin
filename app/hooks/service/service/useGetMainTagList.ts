import { useGetQuery } from "@/app/api/utility/api";

interface PostMainTagListRequest {
    rowNum?: number;
    tagName?: string;
    tagNo?: number;
    recomendYn?: string;
    maxRecomendCount?: number;
    publishCnt?: string;
    tagDate?: string;
    pageSize?: number;
    pageIndex?: number;
    sortField?: string;
    sortOrder?: number;
    searchType?: string;
    searchText?: string;

}

export const useGetMainTagList  = (param: PostMainTagListRequest = {}) => {
    return useGetQuery(
        ['getMainTagList', param],
        '/service/getMainTagList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
