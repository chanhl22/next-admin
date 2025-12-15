import { useGetQuery } from "@/app/api/utility/api";

interface postAppMenuListRequest {
    menuNo?: string;
}

export const useGetAppMenuList = (param: postAppMenuListRequest = {}) => {
    return useGetQuery(
        ['useGetAppMenuList', param],
        '/service/getAppMenuList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

