import { useGetQuery } from "@/app/api/utility/api";

interface PostPublishTagRankListRequest {
    tagName?: string;
}

export const useGetPublishTagRankList  = (param: PostPublishTagRankListRequest = {}) => {
    return useGetQuery(
        ['getPublishTagRankList', param],
        '/service/getPublishTagRankList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
