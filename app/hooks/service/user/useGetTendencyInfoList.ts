import { useGetQuery } from "@/app/api/utility/api";

interface PostTendencyInfoListRequest {

}

export const useGetTendencyInfoList = (param: PostTendencyInfoListRequest = {}) => {
    return useGetQuery(
        ['getTendencyInfoList', param],
        '/user/getTendencyInfoList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};