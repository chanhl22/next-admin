'use client'

import { oauth2Service } from '@/services/oauth2Service'
import { ServiceError, ServiceErrorBodyType } from '@/libs/errors/ServiceError'
import { PATH } from '@/features/common/constant'

/**
 * 공통 API 클라이언트 (클라이언트 전용)
 * - 401 자동 리다이렉트
 * - 에러 핸들링
 * - JSON 파싱
 *
 * ⚠️ Server Component에서는 사용 불가
 * Server Component에서는 직접 fetch 사용
 */
class ApiClient {
  /**
   * 기본 fetch 래퍼
   */
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 boundary 설정)
        ...(!(options?.body instanceof FormData) && {
          'Content-Type': 'application/json',
        }),
        ...options?.headers,
      },
    })
    const data = await response.json()
    // 에러 응답 처리
    if (!response.ok) {
      // 401 Unauthorized - 자동 로그아웃 처리
      if (response.status === 401) {
        // 자동으로 로그아웃 (쿠키 + 로컬스토리지 정리)
        oauth2Service.logout()

        const currentPath = window.location.pathname

        // 현재 로그인 페이지가 아니면 리다이렉트
        if (!currentPath.startsWith(PATH.LOGIN)) {
          window.location.href = `${PATH.LOGIN}?redirect=${encodeURIComponent(currentPath)}`
        }
      }

      const errorPayload = {
        url,
        status: response.status,
        statusText: response.statusText,
      }

      if (response.status === 500) {
        throw new ServiceError<Pick<ServiceErrorBodyType, 'message'>>({
          ...errorPayload,
          data: { message: data.error },
        })
      }

      throw new ServiceError<ServiceErrorBodyType>({
        ...errorPayload,
        data,
      })
    }

    // 204 No Content나 빈 응답 처리는 서버(withFetchUtils)에서 이미 처리됨
    // 여기서는 JSON 파싱만
    return data
  }

  /**
   * GET 요청
   */
  async get<T>(
    url: string,
    options?: RequestInit & { params?: Record<string, any> },
  ): Promise<T> {
    let finalUrl = url

    // params가 있으면 쿼리스트링으로 변환
    if (options?.params) {
      const searchParams = new URLSearchParams()
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })

      const queryString = searchParams.toString()
      if (queryString) {
        finalUrl = `${url}?${queryString}`
      }
    }

    return this.request<T>(finalUrl, {
      ...options,
      method: 'GET',
    })
  }

  /**
   * POST 요청
   */
  async post<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PUT 요청
   */
  async put<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PATCH 요청
   */
  async patch<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * DELETE 요청
   */
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'DELETE',
    })
  }
}

// 싱글톤 인스턴스
export const apiClient = new ApiClient()
