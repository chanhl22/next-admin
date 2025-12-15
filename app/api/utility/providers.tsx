'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { setCurrentMenuPath } from "@/app/api/utility/api";

export default function Providers({ children }: { children: React.ReactNode }) {

  // 토큰 체크 및 topBar 로그인 유저명 갱신 용도 ============================
  const pathname = usePathname();
  const [hadToken, setHadToken] = useState(false);
  useEffect(() => {

    // audit log를 위한 current menu path
    setCurrentMenuPath(pathname);    //api.ts

    if (pathname !== '/' && pathname !== '/login') {
      // token 체크
      let token = null;
      let cookie = document.cookie.split('; ').find(row => row.startsWith('ICHMS-AT='));
      if (cookie) {
        token = cookie.split('=')[1];
      }
      if (!token) {
        setHadToken(false);
        //모두 삭제 및 만료처리
        document.cookie = 'ICHMS-LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'ICHMS-AT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'ICHMS-RT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        window.location.href = '/login'; // 로그인 페이지로 리디렉션 (middleware.ts에서 sessionStorage 접근 불가)
      } else {
        setHadToken(true);
      }
    }
  }, [pathname]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {pathname !== '/' && pathname !== '/login'
        ? hadToken && children      /* pubLayout.tsx : setLayoutConfig(adminNo, adminName) */
        : children
      }
    </QueryClientProvider>
  )
}