import { useGetQuery } from "@/app/api/utility/api";

interface postAppVersionEditListRequest {
    appVersionNo?: String;
}

export const useGetAppVersionEditList = (param: postAppVersionEditListRequest = {}) => {
    return useGetQuery(
        ['useGetAppVersionEditList', param],
        '/service/getAppVersionEditList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

