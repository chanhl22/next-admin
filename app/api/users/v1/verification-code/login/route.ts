import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVER_BASE_URL = process.env.AUTH_SERVER_BASE_URL;

/**
 * 로그인 인증 코드 발급
 * - API 정의서: /api/users/v1/verification-code/login
 * - Method: POST
 */
export async function POST(request: NextRequest) {
  console.log(`로그인 인증 코드 발급 시작`);
  console.log(`${AUTH_SERVER_BASE_URL}/api/users/v1/verification-code/login`);

  try {
    const body = await request.json();

    const response = await fetch(`${AUTH_SERVER_BASE_URL}/api/users/v1/verification-code/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        {
          code: data.code,
          message: data.message,
          stackTrace: data.stackTrace,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(null, { status: 200 });

  } catch (error) {
    console.error("[API Route] 로그인 인증 코드 발급 API error:", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다" },
      { status: 500 }
    );
  }

}