import { useGetQuery } from "@/app/api/utility/api";

interface PostPointMissionListRequest {
    pointMissionDate?: string;
}

export const useGetPointMissionList = (param: PostPointMissionListRequest = {}) => {
    return useGetQuery(
        ['getPointMissionList', param],
        '/reward/getPointMissionList',
        param,
        {
            enabled: !!param.pointMissionDate,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


