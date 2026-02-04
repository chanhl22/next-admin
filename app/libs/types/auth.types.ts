/**
 * 로그인 인증 코드 발급
 */
export interface VerificationCodeLoginRequest {
  clientId: string;
  loginId: string;
  loginPw: string;
  verificationMethodSeCd: string;
}

/**
 * 비밀번호 재설정 인증코드 발급
 */
export interface VerificationCodeResetPasswordRequest {
  clientId: string;
  loginId: string;
}

/**
 * 로그인 비밀번호 재설정
 */
export interface ResetPasswordRequest {
  clientId: string;
  loginId: string;
  verificationCode: string;
}
