import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/services/tokenService";

type ApiHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

export function withAuth(handler: ApiHandler) {
  return async (request: NextRequest, context?: any) => {
    const authorization = tokenService.getAuthorizationHeader(request);

    if (!authorization) {
      return NextResponse.json(
        { error: "[withAuth] 인증 토큰이 없습니다" },
        { status: 401 }
      );
    }

    return handler(request, {
      ...context,
      authorization,
      params: context?.params
    });
  };
}