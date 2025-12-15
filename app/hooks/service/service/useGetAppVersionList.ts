import { useGetQuery } from "@/app/api/utility/api";

interface postAppVersionListRequest {
    appType?: String;
    versionType?: String;
    osType?: String;
    searchType?: String;
    searchText?: String;
}

export const useGetAppVersionList = (param: postAppVersionListRequest = {}) => {
    return useGetQuery(
        ['useGetAppVersionList', param],
        '/service/getAppVersionList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

