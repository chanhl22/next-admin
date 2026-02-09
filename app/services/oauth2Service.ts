import { OAuthLoginRequest, OAuthLoginResponse } from '@/libs/types/oauth2.types'
import { STORAGE_KEYS } from '@/libs/constants/storage'
import Cookies from 'js-cookie'
import { ServiceError } from '@/libs/errors/ServiceError'
import { PATH } from '@/features/common/constant'
/**
 토큰 발급
 */

//TODO
export const oauth2Service = {
  async oauth2Token(request: OAuthLoginRequest): Promise<OAuthLoginResponse> {
    // JSON을 URLSearchParams로 변환
    const params = new URLSearchParams()
    Object.keys(request).forEach((key) => {
      params.append(key, request[key as keyof OAuthLoginRequest] as string)
    })
    const response = await fetch('/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new ServiceError({
        url: '/api/oauth2/token',
        status: response.status,
        statusText: response.statusText,
        data,
      })
    }
    /**
 TODO: react-query에서 관리하는 것이 좋을지, api 순수 로직에서 관리하는게 좋을지 고민해볼 것
        우선 react-query로 이동
    if (data) {
      // 액세스 토큰 저장
      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, data.access_token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      // 리프레시 토큰 저장
      Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token, {
        expires: 30,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      // 리프레시 토큰 요청이 아닐 때 사용자 정보 저장
      if (request.grant_type !== OAUTH.REFRESH_GRANT_TYPE) {
        // 사용자 정보 저장
        localStorage.setItem(STORAGE_KEYS.USER_ID, data.userId)
        // client 정보 저장
        localStorage.setItem(STORAGE_KEYS.CLIENT_ID, data.clientId)
        // 로그인 ID
        localStorage.setItem(STORAGE_KEYS.LOGIN_ID, data.loginId)
        // 토큰 ID
        localStorage.setItem(STORAGE_KEYS.TOKEN_ID, data.tokenId)
        // 비밀번호 변경필요 여부
        localStorage.setItem(
          STORAGE_KEYS.IS_PASSWORD_CHANGE_REQUIRED,
          String(data.isPasswordChangeRequired),
        )
      }
    } else {
      console.log('OAuth 로그인 실패: 응답 데이터 없음')
    }

     */

    return data
  },

  /**
   * 로그아웃 - 토큰 및 로컬 스토리지 정리
   */
  logout(): void {
    // 쿠키 삭제
    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN)
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN)

    // 로컬스토리지 삭제
    localStorage.removeItem(STORAGE_KEYS.USER_ID)
    localStorage.removeItem(STORAGE_KEYS.CLIENT_ID)
    localStorage.removeItem(STORAGE_KEYS.IS_PASSWORD_CHANGE_REQUIRED)
  },

  logoutAndRedirect(redirectPath: string = PATH.LOGIN): void {
    this.logout()
    window.location.href = redirectPath
  },
}
