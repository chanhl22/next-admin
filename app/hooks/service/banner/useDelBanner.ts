import {usePostMutation} from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface BannerRequest {
    bannerNo: number;
}

export const useDelBanner = () => {
    return usePostMutation<BannerRequest, APIResult>(
        '/banner/delBanner',
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

