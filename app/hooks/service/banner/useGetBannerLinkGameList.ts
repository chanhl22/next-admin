import { useGetQuery } from '@/app/api/utility/api';

interface BannerGameRequest {
    appType?: string;
    appTypeName?: string;
    gameType?: string;
    gameTypeName?: string;
    gameTitle?: string;
}

export const useGetBannerLinkGameList = (param: BannerGameRequest = {}) => {
    return useGetQuery(
        ['getBannerLinkGameList', param],
        '/bannerLink/getBannerGameList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

