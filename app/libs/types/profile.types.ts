/**
 * 로그인 비밀번호 변경
 */
export interface ChangeLoginPasswordRequest {
  newLoginPw: string;
  confirmNewLoginPw: string;
}

/**
 * 사용자 프로필 조회
 */
export interface getProfileResponse {
  clientId: string;
  userId: string;
  userTel: string;
  userName: string;
  userBirth: string;
  userTimezone: string;
  genderSeCdNm: string;
  languageSeCd: string;
  languageSeCdNm: string;
  userProfileLastModified: string;
}

/**
 * 운영자 설정 저장
 */
export interface updateOperatorSettings {
  languageSeCd: string;
  userTimezone: string;
}

// ============================================================================
// 사용자 프로필 수정
// ============================================================================

/**
 * 사용자 프로필 수정 요청
 */
export interface UpdateOperatorProfileRequest {
  /** 운영자명 */
  operatorName: string;

  /** 운영자 프로필 내용 */
  operatorProfileCn: string;

  /** 운영자 프로필 이미지 (File) */
  operatorProfileImg: File;
}