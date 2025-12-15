import { useGetQuery } from "@/app/api/utility/api";

interface PostEventDetailRequest {
    promotionNo?: number;
    langType?: string;
}

export const useGetEventDetail = (param: PostEventDetailRequest = {}) => {
    return useGetQuery(
        ['getEventDetail', param],
        '/reward/getEventDetail',
        param,
        {
            enabled: !!param.promotionNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


