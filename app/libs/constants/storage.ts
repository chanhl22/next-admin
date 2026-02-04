/**
 * localStorage 키 상수
 */
export const STORAGE_KEYS = {
  // 액세스 토큰 저장
  ACCESS_TOKEN: 'access_token',
  // 리프레시 토큰 저장
  REFRESH_TOKEN: 'refresh_token',
  // 사용자 정보 저장
  USER_ID: 'user_id',
  // client 정보 저장
  CLIENT_ID: 'client_id',
  // 로그인 ID 정보 저장
  LOGIN_ID: 'login_id',
  // 토큰 ID 정보 저장
  TOKEN_ID: 'token_id',
  // 비빌번호 변경필요 여부
  IS_PASSWORD_CHANGE_REQUIRED: 'is_password_change_required',
  // 이메일 기억하기
  REMEMBER_EMAIL: 'remember_email',
} as const;