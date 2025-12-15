import { useGetQuery } from '@/app/api/utility/api';

interface BannerPromotionRequest {
    bannerImgFileNo?: string;
    bannerImgFilePath?: string;
    title?: string;
    showStateType?: string;
    startDatetime?: string;
    endDatetime?: number;
    createAdminName?: string;
}

export const useGetBannerLinkPromotionList = (param: BannerPromotionRequest = {}) => {
    return useGetQuery(
        ['getBannerLinkPromotionList', param],
        '/bannerLink/getBannerPromotionList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

