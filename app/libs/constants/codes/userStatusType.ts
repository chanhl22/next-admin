/**
 * 사용자 상태 구분코드
 */
export const USER_STATUS = {
  /** 활성 */
  ACTIVE: {
    code: '10101201',
    label: '활성',
  },
  /** 탈퇴 */
  WITHDRAWN: {
    code: '10101202',
    label: '탈퇴',
  },
  /** 휴면 */
  DORMANT: {
    code: '10101203',
    label: '휴면',
  }
} as const;

/**
 * 사용자 상태 코드 타입
 */
export type UserStatusCode = typeof USER_STATUS[keyof typeof USER_STATUS]['code'];

/**
 * 코드로 라벨 찾기
 */
export const getUserStatusLabel = (code: string): string => {
  return Object.values(USER_STATUS).find(status => status.code === code)?.label || code;
};