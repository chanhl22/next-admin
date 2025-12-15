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

export const useGetRecServiceAndCategoryList = (param: BannerRequest = {}) => {
    return useGetQuery(
        ['getRecServiceAndCategoryList', param],
        '/banner/getRecServiceAndCategoryList',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

