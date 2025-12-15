import { useGetQuery } from '@/app/api/utility/api';
import { UseQueryOptions } from '@tanstack/react-query';

interface AdminInfoRequest {
  adminNo?: number;
  email?: string;
  authGroupNo?: number;
  name?: string;
  nickName?: string;
  srchType?: string;
}

interface AdminInfoResponse {
  adminNo: number;
  authGroupNo: number;
  authGroupName: string;
  email: string;
  name: string;
  nickName: string;
  phone: string;
  gender?: string;      // 성별 (M: 남성, F: 여성)
  birthDate?: string;   // 생년월일 (YYYY-MM-DD)
  lastLoginDatetime: string;
  lastChangePwdDatetime: string;
  useYn: string;
  expirePwdDatetime: string;
  createDatetime: string;
  updateDatetime: string | null;
}

export const useGetAdminInfoAuth = (
  param: AdminInfoRequest = {},
  options?: Partial<UseQueryOptions<AdminInfoResponse>>
) => {

  // 🔥 개발 모드에서 Mock 데이터 사용
  const USE_MOCK = true; // true면 모킹, false면 실제 API

  if (USE_MOCK) {
    console.log('🎭 [Mock] 관리자 정보 데이터 사용 중');
    return {
      data: MOCK_ADMIN_INFO_DATA,
      isSuccess: true,
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  return useGetQuery(
    ['getAdminInfoAuth', param],
    '/auth/getAdminInfo',
    param,
    {
      staleTime: 0,               // fresh 관리X
      cacheTime: 1000 * 60 * 5,   // 5분
      enabled: !!param.adminNo,   // 기본값
      ...options,                 // 외부에서 전달된 옵션으로 덮어쓰기
    }
  );
};

// 🔥 Mock 데이터 - 실제 API 응답 기준
const MOCK_ADMIN_INFO_DATA: AdminInfoResponse = {
  adminNo: 193,
  authGroupNo: 1,
  authGroupName: '슈퍼관리자',
  email: 'test193@test.com',
  name: '개발자193',
  nickName: '닉넴193',              // 중복 체크 대상
  phone: '010-9999-8888',
  gender: 'M',              // 남성
  birthDate: '1990-05-15',  // 1990년 5월 15일
  lastLoginDatetime: '2025-12-15 10:42:06',
  lastChangePwdDatetime: '2025-03-31 23:16:21',
  useYn: 'Y',
  expirePwdDatetime: 'Y',           // 비밀번호 만료 여부
  createDatetime: '2025-03-31 09:00:00',
  updateDatetime: null,
};

// 📌 실제 API 응답 구조
// {
//   "code": 0,
//   "message": "SUCCESS",
//   "data": {
//     "adminNo": 193,
//     "authGroupNo": 1,
//     "authGroupName": "슈퍼관리자",
//     "email": "test193@test.com",
//     "name": "개발자193",
//     "nickName": "닉넴193",
//     "phone": "010-9999-8888",
//     "lastLoginDatetime": "2025-12-15 10:42:06",
//     "lastChangePwdDatetime": "2025-03-31 23:16:21",
//     "useYn": "Y",
//     "expirePwdDatetime": "Y"
//   }
// }