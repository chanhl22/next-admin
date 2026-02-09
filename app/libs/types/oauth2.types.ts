/**
 * 토큰 발급
 */
export interface OAuthLoginRequest {
  grant_type: string
  loginId?: string
  loginPw?: string
  verificationMethodSeCd?: string
  verificationCode?: string
  refreshToken?: string
}

export interface OAuthLoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  clientId: string
  userId: string
  tokenId: string
  isUserProfileRegistered: boolean
  loginId: string
  isPasswordChangeRequired: boolean
}
