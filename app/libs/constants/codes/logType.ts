/**
 * 로그 타입 구분
 */
export const LOG_TYPE = {
  /** 로그인 */
  LOGIN: {
    code: 'LOGIN',
    label: '로그인'
  },
  /** 로그아웃 */
  LOGOUT: {
    code: 'LOGOUT',
    label: '로그아웃'
  },
  /** 조회 */
  SELECT: {
    code: 'SELECT',
    label: '조회'
  },
  /** 등록 */
  INSERT: {
    code: 'INSERT',
    label: '등록'
  },
  /** 수정 */
  UPDATE: {
    code: 'UPDATE',
    label: '수정'
  },
  /** 삭제 */
  DELETE: {
    code: 'DELETE',
    label: '삭제'
  },
  /** 다운로드 */
  DOWNLOAD: {
    code: 'DOWNLOAD',
    label: '다운로드'
  }
} as const;

/**
 * 로그 타입 코드 타입
 */
export type LogTypeCode = typeof LOG_TYPE[keyof typeof LOG_TYPE]['code'];

/**
 * 코드로 라벨 찾기
 */
export const getLogTypeLabel = (code: string): string => {
  return Object.values(LOG_TYPE).find(type => type.code === code)?.label || code;
};