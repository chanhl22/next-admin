import { usePostMutation } from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

interface AdminInfoRequest {
  email: string;
  password: string;
}

export const useGetLogin = () => {

  // 🔥 개발 모드에서 Mock 데이터 사용
  const USE_MOCK = true;

  if (USE_MOCK) {
    console.log('🎭 [Mock] 로그인 모킹 사용 중');

    // useMutation과 동일한 인터페이스 반환
    return {
      mutate: (variables: AdminInfoRequest, options?: any) => {
        console.log('🎭 Mock Login:', variables);

        // 약간의 지연 후 성공 콜백 실행
        setTimeout(() => {
          const mockResponse = {
            code: 0,
            message: 'success',
            data: {
              adminNo: 999,
              email: variables.email,
              name: '테스트관리자',
              nickName: '테스터',
              expirePwYn: 'N'
            }
          };

          // 🔥 3개의 쿠키 모두 설정
          // 1. ICHMS-AT: Access Token
          document.cookie = 'ICHMS-AT=mock-access-token-12345; path=/; sameSite=lax';

          // 2. ICHMS-RT: Refresh Token
          document.cookie = 'ICHMS-RT=mock-refresh-token-67890; path=/; sameSite=lax';

          // 3. ICHMS-LOGIN: 사용자 정보 (Login 컴포넌트에서도 설정하지만 여기서도 가능)
          const icmsInfo = JSON.stringify({
            adminNo: mockResponse.data.adminNo,
            email: mockResponse.data.email,
            name: encodeURIComponent(mockResponse.data.name),
            nickName: encodeURIComponent(mockResponse.data.nickName),
            expirePwYn: mockResponse.data.expirePwYn
          });
          document.cookie = 'ICHMS-LOGIN=' + icmsInfo + '; path=/; sameSite=strict;';

          console.log('🍪 Mock 쿠키 3개 설정 완료 (ICHMS-AT, ICHMS-RT, ICHMS-LOGIN)');

          options?.onSuccess?.(mockResponse);
        }, 500); // 0.5초 지연으로 실제 API 호출처럼 보이게
      },
      mutateAsync: async (variables: AdminInfoRequest) => {
        console.log('🎭 Mock Login Async:', variables);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              code: 0,
              message: 'success',
              data: {
                adminNo: 999,
                email: variables.email,
                name: '테스트관리자',
                nickName: '테스터',
                expirePwYn: 'N'
              }
            });
          }, 500);
        });
      },
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: undefined,
      error: null,
    };
  }

  return usePostMutation<AdminInfoRequest, APIResult>(
    '/auth/login',
    {
      onSuccess: (data: APIResult) => {
        if (data && data.code === 0) {
          // console.log('로그인 성공:', data.message);
        } else {
          // console.log('로그인 실패:', data.message);
        }
      },
      onError: (error: Error) => {
        // console.log('로그인 실패');
      },
    }
  );
};

