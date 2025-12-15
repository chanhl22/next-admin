import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
// import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";

const TARGET_HOST = `${process.env.BACKEND_BASE_URL || 'http://localhost:8081'}`;
const proxyHandler = async (request: NextRequest) => {
    const targetUrl = new URL(TARGET_HOST + request.nextUrl.pathname + request.nextUrl.search);
    console.log(`Proxy to backend : ${request.method} ${targetUrl.toString()}`);

    try {
        const fetchHeaders = new Headers(request.headers);
        if (!fetchHeaders.get("Content-Type")) {
            fetchHeaders.set("Content-Type", "application/json");
        }
        // console.log('x-forwarded-for: ', fetchHeaders.get("x-forwarded-for") );

        // 파일 전송인가?
        const isMultipart = fetchHeaders.get("Content-Type")?.toLowerCase().includes("multipart/form-data");

        // let bodyObj = {};
        // try {
        //     bodyObj = await request.json();
        // } catch (e) {
        //     bodyObj = {};   // body가 비어있거나 잘못된 JSON일 때 기본값 사용
        // }

        const fetchOptions: RequestInit = {
            method: request.method,
            headers: fetchHeaders,
            redirect: 'follow',
            cache: 'no-store',
            ...(isMultipart && { duplex: 'half' as any }),  // 파일 전송시 duplex 필요
        };

        if (request.method !== 'GET') {
            fetchOptions.body = isMultipart ? request.body : JSON.stringify(await request.json());
        }

        const response = await fetch(targetUrl.toString(), fetchOptions);


        // cookie 세팅: 로그인 or refresh 성공일때
        if (request.nextUrl.pathname === '/api/auth/login' || request.nextUrl.pathname === '/api/auth/refresh') {
            if (response.status === 200 && response.headers.get('ICHMS-AT') && response.headers.get('ICHMS-RT')) {
                (await cookies()).set('ICHMS-AT', response.headers.get('ICHMS-AT'), {
                    // secure: true,
                    sameSite: 'lax' /* 안내메일에서 href로 연결시 쿠키 유지(get) */
                });
                (await cookies()).set('ICHMS-RT', response.headers.get('ICHMS-RT'), {
                    // secure: true,
                    sameSite: 'lax' /* 안내메일에서 href로 연결시 쿠키 유지(get) */
                });
            }
        }


        // 엑셀 파일 다운로드 응답이면 별도 처리
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
            contentType.includes('application/octet-stream')) {
            const contentDisposition = response.headers.get('Content-Disposition') || '';
            const arrayBuffer = await response.arrayBuffer();

            return new Response(arrayBuffer, {
                status: response.status,
                headers: {
                    'Content-Type': contentType,
                    ...(contentDisposition ? { 'Content-Disposition': contentDisposition } : {}),
                },
            });
        }


        // 그 외 일반 JSON 응답 처리
        const res = NextResponse.json(await response.json(), { status: response.status });
        if (response.status !== 200) {
            console.error(`[res] ${request.nextUrl.pathname} : `, res);
        }
        return res;


    } catch (error) {
        console.error("proxyHandler error:", error);
        return NextResponse.json({ error: "Proxy failed", errMsg: error }, { status: 500 });
    }
};

export async function GET(request: NextRequest) {
    return proxyHandler(request);
}

export async function OPTIONS(request: NextRequest) {
    return proxyHandler(request);
}

export async function POST(request: NextRequest) {
    return proxyHandler(request);
}

export async function DELETE(request: NextRequest) {
    return proxyHandler(request);
}

export async function PUT(request: NextRequest) {
    return proxyHandler(request);
}

export async function PATCH(request: NextRequest) {
    return proxyHandler(request);
}

export async function HEAD(request: NextRequest) {
    return proxyHandler(request);
}
