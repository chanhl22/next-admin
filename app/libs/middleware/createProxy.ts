import { NextRequest, NextResponse } from 'next/server'
import { withAuthApi, withPublicApi } from '@/libs/middleware'
import { ServiceError, ServiceErrorBodyType } from '@/libs/errors/ServiceError'

type RouteContext = {
  params: Promise<Record<string, string | string[]>>
}

/**
 * API 프록시 생성
 */
export function createProxy(
  baseUrl: string | undefined,
  targetPath: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  usePublicApi: boolean = false,
) {
  return async (request: NextRequest, context: RouteContext) => {
    const resolvedParams = await context.params

    const handler = async (
      request: NextRequest,
      {
        safeFetch,
        authorization,
      }: {
        safeFetch: (
          url: string,
          options?: RequestInit,
        ) => Promise<{
          response: Response
          data: any
        }>
        authorization?: string
      },
    ) => {
      // 1. Path Parameters 치환
      let path = targetPath
      if (resolvedParams) {
        Object.entries(resolvedParams).forEach(([key, value]) => {
          path = path.replace(`:${key}`, Array.isArray(value) ? value[0] : value)
        })
      }

      // 2. Query Parameters 추가
      const searchParams = request.nextUrl.searchParams
      const queryString = searchParams.toString()
      const fullPath = queryString ? `${path}?${queryString}` : path

      console.log('[createProxy] URL 정보', {
        originalPath: targetPath,
        replacedPath: path,
        queryString,
        finalUrl: `${baseUrl}${fullPath}`,
      })

      // 3. Content-Type 확인 및 Body/Headers 처리
      const contentType = request.headers.get('content-type') || ''
      let body = null
      let headers: Record<string, string> = {}

      if (authorization) {
        headers.Authorization = authorization
      }

      if (method !== 'GET') {
        // FormData (파일 업로드) 처리
        if (contentType.includes('multipart/form-data')) {
          body = await request.formData()
          // FormData를 사용할 때는 Content-Type을 명시하지 않음
        }
        // JSON 처리
        else {
          const text = await request.text()
          if (text) {
            body = text
            headers['Content-Type'] = 'application/json'
          }
        }
      }

      // 4. API 호출
      const { response, data } = await safeFetch(`${baseUrl}${fullPath}`, {
        method,
        headers,
        ...(body && { body }),
      })

      if (!response.ok) {
        throw new ServiceError<ServiceErrorBodyType>({
          url: `${baseUrl}${fullPath}`,
          status: response.status,
          statusText: response.statusText,
          data,
        })
      }

      return NextResponse.json(data, { status: response.status })
    }

    const wrapper = usePublicApi ? withPublicApi : withAuthApi
    return wrapper(handler)(request, { params: context.params })
  }
}
