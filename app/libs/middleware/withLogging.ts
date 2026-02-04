import { NextRequest, NextResponse } from "next/server";

type ApiHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

export function withLogging(handler: ApiHandler) {
  return async (request: NextRequest, context?: any) => {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();

    console.log("[withLogging] 요청 시작", {
      requestId,
      method: request.method,
      path: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await handler(request, context);
      const duration = Date.now() - startTime;

      console.log("[withLogging] 요청 완료", {
        requestId,
        method: request.method,
        path: request.nextUrl.pathname,
        status: response.status,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      console.error("[withLogging] 요청 실패", {
        requestId,
        method: request.method,
        path: request.nextUrl.pathname,
        duration: `${duration}ms`,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  };
}