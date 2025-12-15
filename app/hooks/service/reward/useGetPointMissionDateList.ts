import { useGetQuery } from "@/app/api/utility/api";

interface PostPointMissionDateListRequest {

}

export const useGetPointMissionDateList = (param: PostPointMissionDateListRequest = {}) => {
    return useGetQuery(
        ['getPointMissionDateList', param],
        '/reward/getPointMissionDateList',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


