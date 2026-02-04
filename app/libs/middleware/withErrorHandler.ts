import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/libs/errors/ApiError";

type ApiHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

export function withErrorHandler(handler: ApiHandler) {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("[withErrorHandler] API 에러 발생", {
        path: request.nextUrl.pathname,
        method: request.method,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });

      // ApiError 처리
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            code: error.data?.code,
            message: error.message,
            stackTrace: error.data?.stackTrace,
          },
          { status: error.status }
        );
      }

      // SyntaxError (JSON 파싱 에러)
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          {
            code: "INVALID_REQUEST_FORMAT",
            message: "잘못된 요청 형식입니다"
          },
          { status: 400 }
        );
      }

      // 기타 에러
      return NextResponse.json(
        {
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "서버 에러가 발생했습니다"
        },
        { status: 500 }
      );
    }
  };
}