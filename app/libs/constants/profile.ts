/**
 * 인증 방식 상수
 */
export const VERIFICATION_METHOD = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
} as const;

/**
 * 인증 방식별 코드 매핑
 */
export const VERIFICATION_CODE = {
  [VERIFICATION_METHOD.SMS]: '10201201',
  [VERIFICATION_METHOD.EMAIL]: '10201202',
} as const;

export type VerificationMethodType = typeof VERIFICATION_METHOD[keyof typeof VERIFICATION_METHOD]; // 'SMS' | 'EMAIL'

/**
 * 인증 관련 메시지
 */
export const VERIFICATION_MESSAGES = {
  SEND_CODE_SMS: '휴대폰으로 인증코드를 발송했습니다.',
  SEND_CODE_EMAIL: '이메일로 인증코드를 발송했습니다.',
  SEND_CODE_ERROR: '인증코드 발송 중 오류가 발생했습니다.',
  CODE_MISMATCH: '인증코드가 일치하지 않습니다.',
  INVALID_INPUT: '인증코드를 입력해주세요',
  INVALID_FORMAT: '올바른 인증코드 형식이 아닙니다.',
} as const;

/**
 * OAuth 관련 상수
 */
export const OAUTH = {
  CLIENT_ID: '8de93679-9f04-4e21-b45e-a7e31cd92f94',
  INTERNAL_GRANT_TYPE: 'ichms_ropc_internal',
  REFRESH_GRANT_TYPE: 'ichms_refresh_token',
} as const;

/**
 * 이메일 관련 에러 메시지
 */
export const EMAIL_MESSAGES = {
  INVALID_INPUT: '이메일을 입력해주세요.',
  INVALID_FORMAT: '올바른 이메일을 입력해주세요.',
} as const;

/**
 * 비밀번호 변경 관련 메시지
 */
export const PASSWORD_MESSAGES = {
  CHANGE_REQUIRED: '※ 비밀번호를 변경한지 90일이 경과되어 비밀번호 변경이 필요합니다.',
  INPUT_GUIDE: '※ 비밀번호를 변경하시려면 아래를 입력해주세요.',
  INVALID_INPUT: '비밀번호를 입력해주세요.',
  INVALID_FORMAT: '비밀번호를 확인해주세요.(영문, 숫자, 특수문자 8~15자)',
  FORMAT: '비밀번호 조건은 영문, 숫자, 특수문자 8~15자 입니다.',
  MISMATCH: '비밀번호가 일치하지 않습니다. 동일한 비밀번호를 입력하세요.',
  TEMP_PASSWORD_SENT: '입력하신 번호로 임시 비밀번호가 전송되었습니다. 해당 비밀번호로 로그인해주세요.',
} as const;

/**
 * 언어/타임존 관련 메시지
 */
export const LANGUAGE_TIMEZONE_MESSAGES = {
  INVALID_LANGUAGE_INPUT: '언어를 선택해주세요.',
  INVALID_TIMEZONE_INPUT: '타임존을 선택해주세요.',
} as const;


/**
 * 로그인
 */
export const LOGIN_MESSAGES = {
  LOGIN_FAILED: '로그인에 실패했습니다.',
} as const;

/**
 * 로그아웃
 */
export const LOGOUT_MESSAGES = {
  LOGOUT: '로그아웃 하시겠습니까?',
} as const;

/**
 * 이메일 정규식
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 비밀번호 정규식
 */
export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}[\]|\\:;"'<>,.?/])[A-Za-z\d~!@#$%^&*()_+`\-={}[\]|\\:;"'<>,.?/]{8,15}$/;