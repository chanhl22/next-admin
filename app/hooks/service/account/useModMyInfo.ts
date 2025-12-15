import { usePostMutation } from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface AdminInfoRequest {
  adminNo: number;
  email: string;
  name: string;
  nickName: string;
  phone: string;
  password: string;
}

export const useModMyInfo = () => {
  return usePostMutation<AdminInfoRequest, APIResult>(
    '/account/modMyInfo',
    {
      onSuccess: (data: APIResult) => {
        if (data.code === 0) {
          // 성공 시 처리
          // console.log('data.code == 0', data.message);
        } else {
          // 실패 시 처리
          // console.error('저장 실패:', data.message);
        }
      },
      onError: (error: Error) => {
        // console.error('저장 에러:', error);
      },
    }
  );
};

