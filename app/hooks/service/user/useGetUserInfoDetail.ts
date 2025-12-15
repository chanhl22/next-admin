import { useGetQuery } from "@/app/api/utility/api";

interface PostUserInfoDetailRequest {
    userNo?: number;
}

export const useGetUserInfoDetail = (param: PostUserInfoDetailRequest = {}) => {
    return useGetQuery(
        ['getUserInfoDetail', param],
        '/user/getUserInfoDetail',
        param,
        {
            enabled: !!param.userNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


