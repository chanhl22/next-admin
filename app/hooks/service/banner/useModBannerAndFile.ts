import {apiClient, usePostMutation} from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';
interface BannerRequest {
    bannerNo?: number;
    bannerType?: string;
    bannerTitle?: string;
    abTestYn?: string;
    abTestId?: string;
    showTargetType?: string;
    showPeriodYn?: string;
    showStartDate?: string;
    showEndDate?: string;
    showLocationType?: string;
    showOrderNo?: number;
    recServiceCategoryNo?: number;
    recServiceNo?: number;
    showCnt?: number;
    clickCnt?: number;
    koBgFile?: File;
    enBgFile?: File;
    koBgFileAt?: File;
    enBgFileAt?: File;
    koBgFileBt?: File;
    enBgFileBt?: File;
    // bannerDetailList?: BannerDetail[];
    bannerDetails?: string;
}

export const useModBannerAndFile = () => {
    const reqUrl = '/banner/modBanner';
    return usePostMutation<BannerRequest, APIResult>(
        "",
        {
            // 기본 mutationFn 대신 정의한 함수 사용
            mutationFn: async (bannerRequest: BannerRequest) => {
                const formData = new FormData();
                Object.entries(bannerRequest).forEach(([key, value]) => {
                    if (value !== null) {
                        formData.append(key, value);
                    }
                });

                const response = await apiClient.post(reqUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                return response.data;
            },
        }
    );
};

