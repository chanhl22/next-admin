import { useGetQuery } from "@/app/api/utility/api";

interface PostCsListRequest {
    inquiryNo?: number;
    statusYn?:string;
    csiCreateDatetime?: string;
    userName?: string;
    categoryType?: string;
    categoryName?: string;
    title?: string;
    contentHtml?: string;
    contentText?: string;
    csrCreateDatetime?: string;
    adminName?: string;
    userNo?: number;
    csNo?: number;
    management?: string;
    searchText?: string;
    searchType?: string;
    readDatetime?: string;
    csrContentText?: string;
    csrContentHtml?: string;
    inqRank?: number;
}

export const useGetCsList = (param: PostCsListRequest = {}) => {
    return useGetQuery(
        ['etCsList', param],
        '/support/getCsList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
