import {usePostMutation} from '@/app/api/utility/api';
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
    // bannerDetailList?: BannerDetail[];
    bannerDetails?: string;
}

export const useModBanner = () => {
    return usePostMutation<BannerRequest, APIResult>(
        '/banner/modBanner',
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    // 성공 시 처리
                    // console.log('data.code == 0', data.message);
                } else {
                    // 실패 시 처리
                    // console.error('저장 실패:', data.message);
                }
            },
            onError: (error) => {
                // console.error('저장 에러:', error);
            },
        }
    );
};

