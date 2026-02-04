import { GenderCode, LanguageCode, OperatorRoleCode, UserStatusCode } from "@/libs/constants/codes";

// ============================================================================
// 운영자 목록 조회
// ============================================================================

/**
 * 운영자 목록 조회 요청
 */
export interface OperatorsRequest {
  /** 사용자 상태 구분코드 (10101201: 활성, 10101202: 탈퇴, 10101203: 휴면) */
  userStatusSeCd: string;

  /** 운영자 권한 구분코드 (50201101: 슈퍼 운영자, 50201102: 운영자) */
  operatorRoleSeCd: string;

  /** 검색구분 */
  searchTp: string;

  /** 검색어 */
  searchWd: string;

  /** 정렬 컬럼 */
  dtOrderCol: string;

  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir: 'ASC' | 'DESC';

  /** 페이지 번호 */
  page: number;

  /** 페이지 크기 */
  pageSize: number;
}

/**
 * 필드명을 API 컬럼명으로 매핑
 */
export const fieldToColumnMap: Record<string, string> = {
  'userStatusSeCdNm': 'user_status_se_cd',
  'operatorName': 'operator_name',
  'loginId': 'login_id',
  'operatorTel': 'operator_tel',
  'registerDt': 'register_dt',
  'registerId': 'register_id'
};


/**
 * 운영자 목록 조회 응답
 */
export interface OperatorsResponse {
  /** 사용자 ID */
  userId: string;

  /** 사용자 상태 구분코드 */
  userStatusSeCd: string;

  /** 사용자 상태 구분코드명 */
  userStatusSeCdNm: string;

  /** 운영자 권한 구분코드 수 */
  operatorRoleCount: string;

  /** 운영자 권한 목록 */
  operatorRoles: OperatorRole[];

  /** 운영자명 (마스킹) */
  operatorName: string;

  /** 로그인 ID (마스킹) */
  loginId: string;

  /** 운영자 전화번호 (마스킹) */
  operatorTel: string;

  /** 등록일시 */
  registerDt: string;

  /** 등록자 */
  registerId: string;
}

// ============================================================================
// 운영자 계정 생성
// ============================================================================

/**
 * 운영자 계정 생성 요청
 */
export interface CreateOperatorRequest {
  /** 사용자 전화번호 (E164 표준: 예) +821099991111) */
  userTel: string;

  /** 로그인 ID (이메일 형식) */
  loginId: string;

  /** 관리 고객 목록 (고객 ID UUID 목록) */
  manageCustomerIds: string[];

  /** 권한 목록 (Role Id String) */
  operatorRoles: string[];

  /** 운영자 명 */
  operatorName: string;

  /** 성별 구분코드 (10101301: 남성, 10101302: 여성, 10101303: 기타) */
  genderSeCd: string;

  /** 운영자 생년월일 (19991231) */
  operatorBirth: string;

  /** 언어 구분코드 (00101101: 한국어, 00101102: 영어) */
  languageSeCd: string;

  /** 운영자 타임존 (+00:00) */
  operatorTimezone: string;

  /** 처리 사유 */
  actionReason: string;
}

/**
 * 운영자 계정 생성 응답
 */
export interface CreateOperatorResponse {
  /** 사용자 ID */
  userId: string;
}

// ============================================================================
// 운영자 계정 수정
// ============================================================================

/**
 * 운영자 계정 수정 요청
 */
export interface UpdateOperatorRequest {
  /** 사용자 ID (UUID) */
  userId: string;

  /** 관리 고객 목록 (고객 ID UUID 목록) */
  manageCustomerIds: string[];

  /** 권한 목록 (Role Id String) */
  operatorRoles: string[];

  /** 운영자 명 */
  operatorName: string;

  /** 언어 구분코드 (00101101: 한국어, 00101102: 영어) */
  languageSeCd: string;

  /** 운영자 타임존 (+00:00) */
  operatorTimezone: string;
}

// ============================================================================
// 운영자 계정 상태 수정
// ============================================================================

/**
 * 운영자 계정 상태 수정 요청
 */
export interface UpdateOperatorStatusRequest {
  /** 로그인 ID (이메일 형식) */
  loginId: string;

  /** 사용자 상태 구분코드 (10101201: 활성, 10101203: 휴면(비활성)) */
  userStatusSeCd: UserStatusCode;
}

// ============================================================================
// 사용자 프로필 저장
// ============================================================================

/**
 * 사용자 프로필 저장 요청
 */
export interface SaveOperatorProfileRequest {
  /** 사용자 ID (UUID) */
  userId: string;

  /** 사용자 명 */
  userName: string;

  /** 사용자 생년월일 (YYYYMMDD) */
  userBirth: string;

  /** 사용자 타임존 (+00:00) */
  userTimezone: string;

  /** 성별 구분코드 (10101301: 남성, 10101302: 여성, 10101303: 기타) */
  genderSeCd: GenderCode;

  /** 언어 구분코드 (00101101: 한국어, 00101102: 영어) */
  languageSeCd: LanguageCode;
}

// ============================================================================
// 로그인 ID 중복확인
// ============================================================================

/**
 * 로그인 ID 중복확인 요청
 */
export interface CheckDuplicationLoginIdRequest {
  /** 로그인 ID (이메일 형식) */
  loginId: string;
}

/**
 * 로그인 ID 중복확인 응답
 */
export interface CheckDuplicationLoginIdResponse {
  /** 중복여부 (true: 중복, false: 중복아님) */
  isDuplicated: boolean;
}


// ============================================================================
// 클라이언트 별 사용자 전화번호 중복확인
// ============================================================================

/**
 * 클라이언트별 사용자 전화번호 중복확인 요청
 */
export interface CheckDuplicationUserTelRequest {
  /** 사용자 전화번호 (E164 표준: 0|| +821099991111) */
  userTel: string;
}

/**
 * 클라이언트별 사용자 전화번호 중복확인 응답
 */
export interface CheckDuplicationUserTelResponse {
  /** 중복여부 (true: 중복, false: 중복아님) */
  isDuplicated: boolean;
}

// ============================================================================
// 운영자 조회
// ============================================================================

/**
 * 운영자 조회 응답
 */
export interface OperatorDetailResponse {
  /** 사용자 ID (UUID) */
  userId: string;

  /** 운영자 권한 목록 */
  operatorRoles: OperatorRole[];

  /** 운영자명 */
  operatorName: string;

  /** 로그인 ID */
  loginId: string;

  /** 운영자 전화번호 */
  operatorTel: string;

  /** 성별 구분코드 (10101301: 남성, 10101302: 여성, 10101303: 기타) */
  genderSeCd: string;

  /** 운영자 생년월일 (YYYYMMDD) */
  operatorBirth: string;

  /** 언어 구분코드 (00101101: 한국어, 00101102: 영어) */
  languageSeCd: string;

  /** 사용자 타임존 (+00:00) */
  userTimezone: string;

  /** 운영자 프로필 이미지 url */
  operatorProfileImgUrl?: string;

  /** 운영자 프로필 내용 */
  operatorProfileCn?: string;
}

// ============================================================================
// 사용자 프로필 수정
// ============================================================================

/**
 * 사용자 프로필 수정 요청
 */
export interface UpdateOperatorProfileRequest {
  /** 사용자 ID (UUID) */
  userId: string;

  /** 사용자 명 */
  userName?: string;

  /** 사용자 생년월일 (YYYYMMDD) */
  userBirth?: string;

  /** 사용자 타임존 (+00:00) */
  userTimezone?: string;

  /** 성별 구분코드 */
  genderSeCd?: GenderCode;

  /** 언어 구분코드 */
  languageSeCd?: LanguageCode;
}

// ============================================================================
// 사용자 계정 탈퇴
// ============================================================================

/**
 * 사용자 계정 탈퇴 요청
 */
export interface WithdrawOperatorRequest {
  /** 탈퇴 대상 사용자 ID */
  targetUserId: string;
}

// ============================================================================
// 공통
// ============================================================================

export interface OperatorRole {
  /** 운영자 권한 구분코드 */
  roleId: string;

  /** 운영자 권한 구분코드명 */
  operatorRoleSeCdNm: string;
}