import { useGetQuery } from "@/app/api/utility/api";

interface PostPointMissionOrderListRequest {

}

export const useGetPointMissionOrderList = (param: PostPointMissionOrderListRequest = {}) => {
    return useGetQuery(
        ['getPointMissionOrderList', param],
        '/reward/getPointMissionOrderList',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


