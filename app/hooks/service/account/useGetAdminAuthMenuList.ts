import { useGetQuery } from "@/app/api/utility/api";

interface PostAdminAuthMenuListRequest {
    authGroupNo?: number;
}

export const useGetAdminAuthMenuList = (param: PostAdminAuthMenuListRequest = {}) => {
    return useGetQuery(
        ['getAdminAuthMenuList', param],
        '/account/getAdminAuthMenuList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
