import { useGetQuery } from "@/app/api/utility/api";

interface PostUserActiveHistoryListRequest {
    userNo?: number;
    pageSize?: number;
    pageIndex?: number;
    searchStartDt?: string;
    searchEndDt?: string;
}

export const useGetUserActiveHistoryList = (param: PostUserActiveHistoryListRequest = {}) => {
    return useGetQuery(
        ['getUserActiveHistoryList', param],
        '/user/getUserActiveHistoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
