import { useGetQuery } from '@/app/api/utility/api';

export const useGetBannerLinkPostCategoryList = (param: any = {}) => {
    return useGetQuery(
        ['getBannerLinkPostCategoryList', param],
        '/bannerLink/getBannerPostCategoryList',
        param,
        {
            staleTime: 1000 * 60 * 10,  // 10분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

