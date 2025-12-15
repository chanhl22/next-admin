import { useGetQuery } from '@/app/api/utility/api';

interface BannerRequest {
    bannerNo?: number;
}

export const useGetBannerAndDetail = (param: BannerRequest = {}) => {
    return useGetQuery(
        ['getBannerAndDetail', param],
        '/banner/getBannerAndDetail',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            // cacheTime: 1000 * 60 * 5,   // 5분
            staleTime: 0,   // fresh 관리X
            cacheTime: 0,   // fresh 관리X
            enabled: false,
        }
    );
};

