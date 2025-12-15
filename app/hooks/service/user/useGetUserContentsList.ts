import { useGetQuery } from "@/app/api/utility/api";

interface PostUserContentsListRequest {
    userNo?: number;
}

export const useGetUserContentsList = (param: PostUserContentsListRequest = {}) => {
    return useGetQuery(
        ['getUserContentsList', param],
        '/user/getUserContentsList',
        param,
        {
            enabled: !!param.userNo,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
