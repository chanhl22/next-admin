import { useGetQuery } from '@/app/api/utility/api';

interface BannerPostPublishRequest {
    postNo?: number;
    pPostCategoryNo?: number;
    postCategoryNo?: number;
    postCategoryName?: string;
    thumbFileNo?: number;
    thumbFilePath?: string;
    title?: string;
    viewCnt?: number;
    likeCnt?: number;
    commentCnt?: number;
    shareCnt?: number;
    publishDatetime?: string;
    editorNickname?: string;
    editorNo?: number;
}

export const useGetBannerLinkPostPublishList = (param: BannerPostPublishRequest = {}) => {
    return useGetQuery(
        ['getBannerLinkPostPublishList', param],
        '/bannerLink/getBannerPostPublishList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

