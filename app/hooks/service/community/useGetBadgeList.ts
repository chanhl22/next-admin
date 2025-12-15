import { useGetQuery } from "@/app/api/utility/api";

interface postBadgeListRequest {
    badgeReqNo?: number;
    badgeReqDatetime?: string;
    userNickname?: string;
    adminName?: string;
    badgeAcceptDatetime?: string;
    badgeAcceptYn?: string;
    badgeType?: string;
    statusType?: string;
    searchType?: string;
    searchKeyword?: string;
}

export const useGetBadgeList = (param: postBadgeListRequest = {}) => {
    return useGetQuery(
        ['useGetBadgeList', param],
        '/community/getBadgeList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

