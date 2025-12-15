import { useGetQuery } from "@/app/api/utility/api";

interface PostPointItemCpnDetailRequest {
    pointItemCpnNo?: number;
}

export const useGetPointItemCpnDetail  = (param: PostPointItemCpnDetailRequest = {}) => {
    return useGetQuery(
        ['getPointItemCpnDetail', param],
        '/reward/getPointItemCpnDetail',
        param,
        {
            enabled: !!param.pointItemCpnNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
