import { apiClient } from '@/libs/api/apiClient'

import {
  ResetPasswordRequest,
  VerificationCodeLoginRequest,
  VerificationCodeResetPasswordRequest,
} from '@/libs/types/auth.types'

export const authService = {
  /**
   * 로그인 인증 코드 발급
   */
  async verificationCodeLogin(request: VerificationCodeLoginRequest) {
    await apiClient.post('/api/users/v1/verification-code/login', request)
  },

  /**
   * 비밀번호 재설정 인증코드 발급
   */
  async verificationCodeResetPassword(request: VerificationCodeResetPasswordRequest) {
    const response = await fetch('/api/users/v1/verification-code/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error('[authService] 비밀번호 재설정 인증코드 발급 실패', {
        cause: {
          status: error.status,
          originalError: error,
        },
      })
    }
  },

  /**
   * 로그인 비밀번호 재설정
   */
  async resetPasswordRequest(request: ResetPasswordRequest) {
    const response = await fetch('/api/users/v1/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error('[authService] 로그인 비밀번호 재설정 실패', {
        cause: {
          status: error.status,
          originalError: error,
        },
      })
    }
  },
}
