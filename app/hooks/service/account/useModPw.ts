import { usePostMutation } from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface AdminInfoRequest {
  adminNo: number,
  password: string;
}

export const useModPw = () => {

  // 🔥 개발 모드에서 Mock 데이터 사용
  const USE_MOCK = true; // true면 모킹, false면 실제 API

  if (USE_MOCK) {
    console.log('🎭 [Mock] 비밀번호 변경 모킹 사용 중');

    return {
      mutate: (variables: AdminInfoRequest, options?: any) => {
        console.log('🎭 Mock 비밀번호 변경:', variables);

        setTimeout(() => {
          const mockResponse = {
            code: 0,
            message: 'SUCCESS',
            data: null
          };

          console.log('✅ Mock 비밀번호 변경 성공');
          options?.onSuccess?.(mockResponse);
        }, 500);
      },
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: undefined,
      error: null,
    };
  }

  return usePostMutation<AdminInfoRequest, APIResult>(
    '/auth/modPassword',
    {
      onSuccess: (data: APIResult) => {
        if (data && data.code === 0) {
          // console.log('resetPassword 성공:', data.message);
        } else {
          // console.log('resetPassword 실패:', data.message);
        }
      },
      onError: (error: Error) => {
        // console.log('resetPassword 실패');
      },
    }
  );
};

