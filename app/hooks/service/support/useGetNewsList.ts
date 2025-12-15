import { useGetQuery } from "@/app/api/utility/api";


interface PostNewsListRequest {
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
    thumbFileUrl?: string;
}

export const useGetNewsList = (param: PostNewsListRequest = {}) => {
    return useGetQuery(
        ['etNewsList', param],
        '/support/getNewsList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
