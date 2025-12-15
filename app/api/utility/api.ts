import {useQuery, useMutation} from '@tanstack/react-query';
import axios from 'axios';

// API 클라이언트 생성
export const apiClient = axios.create({
  baseURL: '/api', // Next.js API 라우트 기본 경로
  headers: {
    'Content-Type': 'application/json',
  },
});

// audit log를 위한 current menu path (menu path로 menuNo 매칭)
let currentMenuPath: string | null = '';
export function setCurrentMenuPath(menuPath: string) {
  currentMenuPath = menuPath;
}

// 요청 인터셉터: Access Token 추가
apiClient.interceptors.request.use(
  (config) => {
    let token = null;
    let cookie = document.cookie.split('; ').find(row => row.startsWith('ICHMS-AT='));
    if (cookie) { token = cookie.split('=')[1]; }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Menu-Path'] = currentMenuPath;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// 응답 인터셉터: Access Token 갱신 처리 ============
// 👇 전체 주석 처리
/*
// 무한루프 제한 cnt
let refreshCnt = 0;

// refresh 큐 (동시요청 방지)
let isRefreshing = false;
let refreshSubscribers = [];
function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach(callback => callback(newAccessToken));
    refreshSubscribers = [];
};
function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
};

// 쿠키전체제거
const removeAllCookies = () => {
    document.cookie = 'ICHMS-LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'ICHMS-AT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'ICHMS-RT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        refreshCnt++;   // 무한루프 제한 cnt
        if (refreshCnt > 10) {
            refreshCnt = 0;
            isRefreshing = false;
            refreshSubscribers = [];
            removeAllCookies();
            window.location.href = '/login'; // 로그인 페이지로 리디렉션
        }

        // response없고, 'ERR_NETWORK' 일경우, refresh X
        if (error.response === undefined) {
            if (error.code === 'ERR_NETWORK') {
                refreshCnt = 0;
                isRefreshing = false;
                refreshSubscribers = [];
                removeAllCookies();
                window.location.href = '/login'; // 로그인 페이지로 리디렉션
            }
        }
        // 401 일경우, refresh처리 후 재요청
        else if (error.response?.status === 401) {
            let refreshToken = null;
            let rtCookie = document.cookie.split('; ').find(row => row.startsWith('ICHMS-RT='));
            if (rtCookie) { refreshToken = rtCookie.split('=')[1]; }
            if (refreshToken) {
                try {

                    // 이미 refresh 중이면, 새 토큰 발급 후 재시도하도록 큐에 등록
                    // dev mode:   middleware에서 page 권한체크 -> newToken발급 요청 -> page 빌드 중    route proxy에서 cookie newToken 세팅 완료
                    // start mode: middleware에서 page 권한체크 -> newToken발급 요청 -> page 빌드 없고, route proxy에서 cookie newToken 세팅전에 재요청됨
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            addRefreshSubscriber(newAccessToken => {
                                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                                resolve(apiClient(error.config));
                            });
                        });
                    }
                    isRefreshing = true;

                    const {data} = await apiClient.post('/auth/refresh', {refreshToken: refreshToken});

                    if (data && data.code === 0) {

                        // 재발급 AT, RT cookie는 route proxy에서 처리, maxAge는 없음

                        // 대기 중인 요청들 실행 (route proxy에서 cookei 세팅되지만, 한번더 세팅)
                        let newAccessToken = null;
                        let atCookie = document.cookie.split('; ').find(row => row.startsWith('ICHMS-AT='));
                        if (atCookie) { newAccessToken = atCookie.split('=')[1]; }
                        onRefreshed(newAccessToken);
                        isRefreshing = false;

                        // 변조 테스트: 무한루프
                        // document.cookie = 'ICHMS-AT=' + 'asdfsadfsaefasdfasaef' + '; path=/; sameSite=strict;';

                        // 원래 요청 재시도 (interceptors.request 에서 재발급된 cookie newToken 사용)
                        return apiClient(error.config);

                    } else {
                        refreshCnt = 0;
                        isRefreshing = false;
                        refreshSubscribers = [];
                        removeAllCookies();
                        window.location.href = '/login'; // 로그인 페이지로 리디렉션
                    }

                } catch (refreshError) {
                    refreshCnt = 0;
                    isRefreshing = false;
                    refreshSubscribers = [];
                    removeAllCookies();
                    window.location.href = '/login'; // 로그인 페이지로 리디렉션
                }

            } else {
                refreshCnt = 0;
                isRefreshing = false;
                refreshSubscribers = [];
                removeAllCookies();
                window.location.href = '/login'; // 로그인 페이지로 리디렉션
            }
        }

        return Promise.reject(error);
    }
);
*/

// 👇 간단한 인터셉터로 대체 (개발 모드용)
let refreshCnt = 0; // useGetQuery에서 사용하므로 선언 필요
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('🔧 개발 모드: API 에러 발생, 리다이렉트 안 함', error.config?.url);
    return Promise.reject(error);
  }
);

// 공통 에러 처리
const handleError = (error: any) => {
  console.log('API Error:', error);
  throw error;
};

// GET 요청을 위한 커스텀 훅
export const useGetQuery = (
  queryKey: any[],
  url: string,
  params: Record<string, any> = {},
  options = {}
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await apiClient.get(url, {params});
        const apiResult = response.data;
        console.log('apiResult', apiResult);

        // apiClient.interceptors.response로 refresh 이후 재호출된 요청이 성공이면 초기화
        if (apiResult.code === 0 ) { refreshCnt = 0; }

        return apiResult.data;
      } catch (error) {
        return handleError(error);
      }
    },
    ...options,
  });
};

// POST 요청을 위한 커스텀 훅
// 엑셀 다운로드를 위해 options 추가 및 로직 추가
export const usePostMutation = <TData = any, TResponse = any>(
  url: string,
  options: {
    responseType?: 'json' | 'blob';
    [key: string]: any;
  } = {}
) => {
  return useMutation<TResponse, Error, TData>({
    mutationFn: async (data: TData) => {
      try {
        const config = {
          ...options,
          responseType: options.responseType || 'json'  // 기본은 json
        };
        const response = await apiClient.post(url, data, config);

        // apiClient.interceptors.response로 refresh 이후 재호출된 요청이 성공이면 초기화
        if (response.data.code === 0 ) { refreshCnt = 0; }

        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    ...options,
  });
};


// PUT 요청을 위한 커스텀 훅
export const usePutMutation = (url: string, options = {}) => {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await apiClient.put(url, data);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    ...options,
  });
};

// DELETE 요청을 위한 커스텀 훅
export const useDeleteMutation = (url: string, options = {}) => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await apiClient.delete(url);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    ...options,
  });
};