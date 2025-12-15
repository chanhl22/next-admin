import { useGetQuery } from "@/app/api/utility/api";

interface PostUserEditTagListRequest {
    rowNum?: number;
    tagName?: string;
    tagNo?: number;
    recomendYn?: string;
    publishCnt?: string;
    cleansingYn?: string;
    tagDate?: string;
    pageSize?: number;
    pageIndex?: number;
    sortField?: string;
    sortOrder?: number;
    searchType?: string;
    searchText?: string;
}

export const useGetUserEditTagList  = (param: PostUserEditTagListRequest = {}) => {
    return useGetQuery(
        ['getUserEditTagList', param],
        '/service/getUserEditTagList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
