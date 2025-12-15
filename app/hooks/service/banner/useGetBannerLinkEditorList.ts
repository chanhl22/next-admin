import { useGetQuery } from '@/app/api/utility/api';

interface BannerEditorRequest {
    editorNo?: number;
    profileFileNo?: number;
    profileFilePath?: string;
    nickname?: string;
    followerCnt?: number;
    postingCnt?: number;
    lastLoginDatetime?: string;
}

export const useGetBannerLinkEditorList = (param: BannerEditorRequest = {}) => {
    return useGetQuery(
        ['getBannerLinkEditorList', param],
        '/bannerLink/getBannerEditorList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

