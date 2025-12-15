import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemDetailRequest {
    pointItemNo?: number;
}

export const useGetPointItemDetail = (param: PostPointItemDetailRequest = {}) => {
    return useGetQuery(
        ['getPointItemDetail', param],
        '/reward/getPointItemDetail',
        param,
        {
            enabled: !!param.pointItemNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
