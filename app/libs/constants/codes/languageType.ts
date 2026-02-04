/**
 * 언어 구분코드
 */
export const LanguageType = {
  /** 한국어 */
  KOREAN: {
    code: '00101101',
    label: '한국어'
  },
  /** 영어 */
  ENGLISH: {
    code: '00101102',
    label: '영어'
  }
} as const;

/**
 * 언어 코드 타입
 */
export type LanguageCode = typeof LanguageType[keyof typeof LanguageType]['code'];

/**
 * 코드로 LanguageType 객체 찾기
 */
export const getLanguageByCode = (code: string) => {
  return Object.values(LanguageType).find(lang => lang.code === code);
};


/**
 * 코드로 라벨 찾기
 */
export const getLanguageLabel = (code: string): string => {
  return Object.values(LanguageType).find(lang => lang.code === code)?.label || code;
};