import {usePostMutation} from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface AdminInfoRequest {
    email: string;
}

export const useModResetPw = () => {
    return usePostMutation<AdminInfoRequest, APIResult>(
        '/auth/resetPassword',
        {
            onSuccess: (data) => {
                if (data && data.code === 0) {
                    // console.log('resetPassword 성공:', data.message);
                } else {
                    // console.log('resetPassword 실패:', data.message);
                }
            },
            onError: (error) => {
                // console.log('resetPassword 실패');
            },
        }
    );
};

