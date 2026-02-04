// ============================================================================
// 메시지 발송 이력 목록 조회
// ============================================================================

/**
 * 메시지 발송 이력 목록 조회 요청
 */
export interface MessageManagementRequest {
  /** 메시지 발송 상태 구분코드 */
  operMsgSendStatusSeCd: string;
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
  'operMsgSn': 'oper_msg_sn',
  'sentDt': 'sent_dt',
  'sendTargetUserCount': 'send_target_user_count',
  'msgCn': 'msg_cn',
  'registerDt': 'register_dt',
  'registerName': 'register_name',
  'operMsgSendStatusSeCd': 'oper_msg_send_status_se_cd',
  'operMsgSendStatusSeCdNm': 'oper_msg_send_status_se_cd_nm'
};

/**
 * 메시지 발송 이력 목록 조회 응답
 */
export interface MessageManagementResponse {
  /** 번호 */
  rowNum: number;
  /** 운영자 메시지 일련번호 */
  operMsgSn: number;
  /** 발송일시 */
  sentDt: string;
  /** 발송 대상자 수 */
  sendTargetUserCount: number;
  /** 메시지 내용 */
  msgCn: string;
  /** 등록일시 */
  registerDt: string;
  /** 등록자 이름 */
  registerName: string;
  /** 메시지 발송 상태 구분코드 */
  operMsgSendStatusSeCd: string;
  /** 메시지 발송 상태 구분코드명 */
  operMsgSendStatusSeCdNm: string;
}

// ============================================================================
// 메시지 발송 대상자 이력 목록 조회
// ============================================================================

/**
 * 메시지 발송 대상자 이력 목록 조회 요청
 */
export interface GetOperatorMessageSendTargetHistorysRequest {
  /** 읽음여부 */
  isRead?: boolean;
  /** 검색구분 */
  searchTp?: string;
  /** 검색어 */
  searchWd?: string;
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 (default 1) */
  page?: number;
  /** 페이지 크기 (default 10) */
  pageSize?: number;
}

/**
 * 메시지 발송 대상자 이력 목록 조회 응답
 */
export interface OperatorMessageSendTargetHistorysResponse {
  /** 번호 */
  rowNum: number;
  /** 사용자 명 */
  userName: string;
  /** 사용자 전화번호 */
  userTel: string;
  /** 읽음여부 */
  isRead: boolean;
}

// ============================================================================
// 메시지 발송 대상자 목록 조회
// ============================================================================

/**
 * 메시지 발송 대상자 목록 조회 요청
 */
export interface SendTargetsRequest {
  /** 검색구분 */
  searchTp?: string;
  /** 검색어 */
  searchWd?: string;
  /** 정렬 컬럼 */
  dtOrderCol?: string;
  /** 정렬 순서 (ASC, DESC) */
  dtOrderDir?: string;
  /** 페이지 번호 (default 1) */
  page?: number;
  /** 페이지 크기 (default 10) */
  pageSize?: number;
}

/**
 * 메시지 발송 대상자 목록 조회 응답
 */
export interface SendTargetsResponse {
  /** 사용자 ID */
  userId: string;
  /** 사용자 명 */
  userName: string;
  /** 사용자 전화번호 */
  userTel: string;
}

// ============================================================================
// 메시지 발송 등록
// ============================================================================

/**
 * 메시지 발송 등록 요청
 */
export interface SendMessageRequest {
  /** 수신 사용자 ID */
  receiverUserIds: string[];
  /** 발송일시 */
  sendDt: string;
  /** 메시지 내용 */
  msgCn: string;
}