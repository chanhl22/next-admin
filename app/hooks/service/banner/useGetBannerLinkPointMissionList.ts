import { useGetQuery } from '@/app/api/utility/api';

interface BannerPointMissionRequest {
    type?: string;
    typeName?: string;
    title?: string;
    description?: string;
    linkLabel?: string;
}

export const useGetBannerLinkPointMissionList = (param: BannerPointMissionRequest = {}) => {
    return useGetQuery(
        ['getBannerLinkPointMissionList', param],
        '/bannerLink/getBannerPointMissionList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

