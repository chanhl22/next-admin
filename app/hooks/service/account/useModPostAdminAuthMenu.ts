import { usePostMutation } from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface PostAdminAuthMenuRequest {
    authGroupNo?: number;
    menuList: {
        menuNo: number;
        authType: string;
    }[];
}

export const useModPostAdminAuthMenu = () => {
    return usePostMutation<PostAdminAuthMenuRequest, APIResult>(
        '/account/modPostAdminAuthMenu',
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    console.log('저장 성공:', data.message);
                } else {
                    console.error('저장 실패:', data.message);
                }
            },
            onError: (error) => {
                console.error('저장 에러:', error);
            },
        }
    );
};
