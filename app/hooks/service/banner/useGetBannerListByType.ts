import { useGetQuery } from '@/app/api/utility/api';

interface BannerRequest {
    bannerType?: string;
    abTestYn?: string;
    showTargetType?: string;
    langType?: string;
    showStateType?:string;
    createAdminName?:string;
    showLocationType?:string;
    recServiceCategoryNo?:number;
}

export const useGetBannerListByType = (param: BannerRequest = {}) => {
    return useGetQuery(
        ['getBannerListByType', param],
        '/banner/getBannerListByType',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

