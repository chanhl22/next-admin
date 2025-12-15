import {usePostMutation} from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface AdminInfoRequest {
    adminNo: number;
    authGroupNo?: number;
    name?:string;
    nickName?:string;
    phone?:string;
    useYn?:string;
}

export const useModAdminInfo = () => {
    return usePostMutation<AdminInfoRequest, APIResult>(
        '/account/modAdminInfo',
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    // 성공 시 처리
                    // console.log('저장 성공:', data.message);
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

