import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/libs/errors/ApiError";

type ApiHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

/**
 * Response를 안전하게 JSON 파싱
 */
async function parseJsonResponse(response: Response) {
  // 1. 204 No Content
  if (response.status === 204) {
    return null;
  }

  // 2. Content-Length 체크
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0") {
    return null;
  }

  // 3. 텍스트로 읽기
  const text = await response.text();

  // 4. 빈 응답
  if (!text || text.trim() === "") {
    return null;
  }

  // 5. Content-Type 체크
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    console.error("[parseJsonResponse] JSON이 아닌 응답:", text.substring(0, 100));
    throw new ApiError("백엔드 응답 형식 오류 (JSON 아님)", 502);
  }

  // 6. JSON 파싱
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("[parseJsonResponse] JSON 파싱 실패:", text.substring(0, 100));
    throw new ApiError("백엔드 응답 형식 오류 (잘못된 JSON)", 502);
  }
}

export function withFetchUtils(handler: ApiHandler) {
  return async (request: NextRequest, context?: any) => {
    /**
     * 안전한 fetch 함수
     * - 자동으로 JSON 파싱
     * - 204, 빈 응답, Content-Type 체크
     */
    const safeFetch = async (url: string, options: RequestInit = {}) => {
      const response = await fetch(url, options);
      const data = await parseJsonResponse(response);

      return { response, data };
    };

    return handler(request, {
      ...context,
      safeFetch,
    });
  };
}