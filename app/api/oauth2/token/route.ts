import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVER_BASE_URL = process.env.AUTH_SERVER_BASE_URL;
const ICHMS_CLIENT_ID = process.env.ICHMS_CLIENT_ID;
const ICHMS_CLIENT_SECRET = process.env.ICHMS_CLIENT_SECRET;

/**
 * 토큰 발급
 * - API 정의서: /oauth2/token
 * - Method: POST
 */
export async function POST(request: NextRequest) {
  console.log(`토큰 발급`);
  console.log(`${AUTH_SERVER_BASE_URL}/oauth2/token`);

  try {
    const credentials = btoa(`${ICHMS_CLIENT_ID}:${ICHMS_CLIENT_SECRET}`);
    const body = await request.text();

    const response = await fetch(`${AUTH_SERVER_BASE_URL}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`
      },
      body: body,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          code: data.code,
          message: data.message,
          stackTrace: data.stackTrace,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("[API Route] 토큰 발급 API error:", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다" },
      { status: 500 }
    );
  }

}