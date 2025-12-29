import {NextRequest, NextResponse} from "next/server";

// AUTH 서버 주소
const AUTH_SERVER = 'https://stg.ichms.ai/auth';

// HTTP 메서드별 핸들러
export async function GET(request: NextRequest) {
  return proxyHandler(request);
}

export async function POST(request: NextRequest) {
  return proxyHandler(request);
}

export async function PUT(request: NextRequest) {
  return proxyHandler(request);
}

export async function DELETE(request: NextRequest) {
  return proxyHandler(request);
}

export async function PATCH(request: NextRequest) {
  return proxyHandler(request);
}

const proxyHandler = async (request: NextRequest) => {
  // 요청 경로에서 /api/auth 제거
  // 예: /api/auth/api/users/v1/verification-code/login → /api/users/v1/verification-code/login

  console.log("request.nextUrl.pathname");
  console.log(request.nextUrl.pathname);

  const path = request.nextUrl.pathname.replace('/api/auth', '');

  // 최종 목적지 URL 생성
  // 예: http://ichms-gateway/auth/api/users/v1/verification-code/login
  const targetUrl = new URL(AUTH_SERVER + path + request.nextUrl.search);

  console.log("AUTH_SERVER");
  console.log(AUTH_SERVER);

  console.log(`🔐 Auth Proxy: ${request.method} ${targetUrl.toString()}`);

  try {
    // 헤더 설정
    const fetchHeaders = new Headers(request.headers);
    if (!fetchHeaders.get("Content-Type")) {
      fetchHeaders.set("Content-Type", "application/json");
    }

    // fetch 옵션 설정
    const fetchOptions: RequestInit = {
      method: request.method,
      headers: fetchHeaders,
      redirect: 'follow',
      cache: 'no-store',
    };

    // GET이 아니면 body 추가
    if (request.method !== 'GET') {
      fetchOptions.body = JSON.stringify(await request.json());
    }

    // AUTH 서버로 요청
    console.log("targetUrl.toString()")
    console.log(targetUrl.toString())
    console.log("fetchOptions.body")
    console.log(fetchOptions.body)

    const response = await fetch(targetUrl.toString(), fetchOptions);

    // 응답 처리
    const jsonData = await response.json();
    const res = NextResponse.json(jsonData, { status: response.status });

    if (response.status !== 200) {
      console.error(`❌ Auth Proxy Error [${path}]:`, jsonData);
    }

    return res;

  } catch (error) {
    console.error("❌ Auth Proxy Error:", error);
    return NextResponse.json(
      { error: "Auth proxy failed", errMsg: String(error) },
      { status: 500 }
    );
  }
};