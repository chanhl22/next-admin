import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemCtgDetailRequest {
    pointItemCtgNo?: number;
}

export const useGetPointItemCtgDetail  = (param: PostPointItemCtgDetailRequest = {}) => {
    return useGetQuery(
        ['getPointItemCtgDetail', param],
        '/reward/getPointItemCtgDetail',
        param,
        {
            enabled: !!param.pointItemCtgNo,
            staleTime: 0,
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
