'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="py-5 px-5 min-h-screen flex justify-content-center align-items-center">
        <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1 w-full md:w-auto">
          <div className="mb-4">
            <div className="flex align-items-end justify-content-center mb-5">
              <span className="text-3xl font-semibold mr-2">아이콜리</span>
              <span className="text-base font-semibold mb-1">관리자 웹</span>
            </div>
          </div>

          <div className="items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-red-600">404 - Not found</h1>
            <p className="mt-4 text-lg">
              페이지를 찾을 수 없습니다.
            </p>
            <p className="mt-4 text-lg">
              요청하신 페이지가 존재하지 않습니다.
            </p>
            <a href="#" className="mt-6 text-blue-500 hover:underline" onClick={() => router.back()}>
              Go Back
            </a>
          </div>

        </div>
      </div>
    </>
  );
}