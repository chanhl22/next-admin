/**
 * 운영자 권한 구분코드
 */
export const OPERATOR_ROLE = {
  /** 슈퍼 운영자 */
  SUPER_ADMIN: {
    code: '50201101',
    label: '슈퍼 운영자',
  },
  /** 운영자 */
  ADMIN: {
    code: '50201102',
    label: '운영자',
  }
} as const;

/**
 * 운영자 권한 코드 타입
 */
export type OperatorRoleCode = typeof OPERATOR_ROLE[keyof typeof OPERATOR_ROLE]['code'];


/**
 * 코드로 라벨 찾기
 */
export const getOperatorRoleLabel = (code: string): string => {
  return Object.values(OPERATOR_ROLE).find(role => role.code === code)?.label || code;
};