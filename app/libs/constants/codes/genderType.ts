/**
 * 성별 구분코드
 */
export const GenderType = {
  /** 남성 */
  MALE: {
    code: '10101301',
    label: '남성'
  },
  /** 여성 */
  FEMALE: {
    code: '10101302',
    label: '여성'
  },
  /** 기타 */
  OTHER: {
    code: '10101303',
    label: '기타'
  }
} as const;

/**
 * 성별 코드 타입
 */
export type GenderCode = typeof GenderType[keyof typeof GenderType]['code'];

/**
 * 코드로 라벨 찾기
 */
export const getGenderLabel = (code: string): string => {
  return Object.values(GenderType).find(gender => gender.code === code)?.label || code;
};