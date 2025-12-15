import { useGetQuery } from "@/app/api/utility/api";

interface PostTendencyTagListRequest {
    tagName?: string;
}

export const useGetTendencyTagList  = (param: PostTendencyTagListRequest = {}) => {
    return useGetQuery(
        ['getTendencyTagList', param],
        '/service/getTendencyTagList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
