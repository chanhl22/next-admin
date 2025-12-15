import {usePostMutation} from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface AdminInfoRequest {
    adminNo?: number;
    authGroupNo?: number;
    email?: number;
    // password?: number;
    name?:string;
    nickName?:string;
    phone?:string;
    useYn?:string;
}

export const useInsAdminInfo = () => {
    return usePostMutation<AdminInfoRequest, APIResult>(
        '/account/insAdminInfo',
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    // console.log('저장 성공:', data.message);
                } else {
                    // console.error('저장 실패:', data.message);
                }
            },
            onError: (error) => {
                // console.error('저장 에러:', error);
            },
        }
    );
};

