import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemRankingListRequest {
    searchPointPeriodType?: string;
}

export const useGetPointItemRankingList = (param: PostPointItemRankingListRequest = {}) => {
    return useGetQuery(
        ['getPointItemRankingList', param],
        '/reward/getPointItemRankingList',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


