import { useGetQuery } from "@/app/api/utility/api";


interface PostNewsDetailRequest {
    newsNo?: number;
    thumbFileNo?: number;
    title?: string;
    viewCnt?: number;
    langType?: string;
    adminDatetime?: string;
    adminNo?: number;
    adminName?: string;
    contentText?: string;
    contentHtml?: string;
    searchType?: string;
    searchText?: string;
}

export const useGetNewsDetail = (param: PostNewsDetailRequest = {}) => {
    return useGetQuery(
        ['etNewsList', param],
        '/support/getNewsDetail',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
