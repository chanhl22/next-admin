import { LogTypeCode } from "@/libs/constants/codes";

// ============================================================================
// 운영자 활동 로그 저장 요청
// ============================================================================

/**
 * 운영자 활동 로그 저장 요청
 */
export interface CreateActivityLogRequest {
  /** 토큰 ID */
  tokenId: string;
  /** 로그 타입 구분 */
  logTypeSe: LogTypeCode;
  /** 운영자 Web 메뉴 일련번호 */
  operWebMenuSn?: number;
  /** 대상 사용자 ID */
  targetUserId?: string;
}

// ============================================================================
// 운영자 권한 목록 조회 응답
// ============================================================================

/**
 * 운영자 권한 목록 조회 응답
 */
export interface OperatorRoleCodeResponse {
  /** 권한 ID */
  roleId: string;
  /** 운영자 권한 구분코드명 */
  operatorRoleSeCdNm: string;
  /** 권한 레벨 */
  roleLevel: number;
  /** 상위 권한 ID */
  upperRoleId?: string;
  /** 상위 운영자 권한 구분코드명 */
  upperOperatorRoleSeCdNm?: string;
  /** 상위 권한 레벨 */
  upperRoleLevel?: number;
}

// ============================================================================
// 회원 고객 목록 조회
// ============================================================================

/**
 * 회원 고객 목록 조회 응답
 */
export interface MemberCustomerResponse {
  /** 회원 고객 ID */
  memberCustomerId: string;
  /** 회원 고객명 */
  memberCustomerName: string;
}

// ============================================================================
// 루틴 진행 상태 구분코드 목록 조회
// ============================================================================

/**
 * 루틴 진행 상태 구분코드 목록 조회 응답
 */
export interface RoutineProgressStatusCodeResponse {
  /** 루틴 진행 상태 구분코드 */
  routineProgressStatusSeCd: string;
  /** 루틴 진행 상태 구분코드명 */
  routineProgressStatusSeCdNm: string;
}

// ============================================================================
// 메시지 발송 상태 구분코드 목록 조회
// ============================================================================

/**
 * 메시지 발송 상태 구분코드 목록 조회 응답
 */
export interface OperatorMsgSendStatusCodeResponse {
  /** 메시지 발송 상태 구분코드 */
  operatorMsgSendStatusSeCd: string;
  /** 메시지 발송 상태 구분코드명 */
  operatorMsgSendStatusSeCdNm: string;
}

// ============================================================================
// 사용자 상태 구분코드 목록 조회
// ============================================================================

/**
 * 사용자 상태 구분코드 목록 조회 응답
 */
export interface UserStatusCodeResponse {
  /** 사용자 상태 구분코드 */
  userStatusSeCd: string;
  /** 사용자 상태 구분코드명 */
  userStatusSeCdNm: string;
}

// ============================================================================
// 루틴 카테고리 구분코드 목록 조회
// ============================================================================

/**
 * 루틴 카테고리 구분코드 목록 조회 응답
 */
export interface RoutineCategoryCodeResponse {
  /** 루틴 카테고리 구분코드 */
  routineCategorySeCd: string;
  /** 루틴 카테고리 구분코드명 */
  routineCategorySeCdNm: string;
}

// ============================================================================
// 식사 구분코드 목록 조회
// ============================================================================

/**
 * 식사 구분코드 응답
 */
export interface MealCodeResponse {
  /** 식사 구분코드 */
  mealSeCd: string;
  /** 식사 구분코드명 */
  mealSeCdNm: string;
}

// ============================================================================
// 섭취 칼로리 상태 구분코드 목록 조회
// ============================================================================

/**
 * 섭취 칼로리 상태 구분코드 목록 조회 응답
 */
export interface IntakeCalorieStatusCodeResponse {
  /** 섭취 칼로리 상태 구분코드 */
  intakeCalorieStatusSeCd: string;
  /** 섭취 칼로리 상태 구분코드명 */
  intakeCalorieStatusSeCdNm: string;
}

// ============================================================================
// 기간 구분코드 목록 조회
// ============================================================================

/**
 * 기간 구분코드 응답
 */
export interface PeriodCodeResponse {
  /** 기간 구분코드 */
  periodSeCd: string;
  /** 기간 구분코드명 */
  periodSeCdNm: string;
}

// ============================================================================
// 문의 상태 구분코드 목록 조회
// ============================================================================

/**
 * 문의 상태 구분코드 응답
 */
export interface InquiryStatusCodeResponse {
  /** 문의 상태 구분코드 */
  inquiryStatusSeCd: string;
  /** 문의 상태 구분코드명 */
  inquiryStatusSeCdNm: string;
}