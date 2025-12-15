import { useGetQuery } from "@/app/api/utility/api";

interface PostCsDetailRequest {
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
    readDatetime?: string;
    csrContentText?: string;
    csrContentHtml?: string;
    inqRank?: number;
}

export const useGetCsDetail = (param: PostCsDetailRequest = {}) => {
    return useGetQuery(
        ['etCsDetail', param],
        '/support/getCsDetail',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
