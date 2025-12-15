import { useGetQuery, usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

/**
 * 커뮤니티 포스트 목록을 조회하는 커스텀 훅
 *
 * @example
 * import { useTest } from "@/hooks/service/test/useTest";
 * ```tsx
 * function TestPage() {
 *   const {
 *     data: posts,      // 포스트 목록 데이터 <-- posts로 allias
 *     isLoading,        // 로딩 상태
 *     error,           // 에러 객체
 *     refetch          // 데이터 재조회 함수
 *   } = useTest();
 *
 *   if (isLoading) return <div>Loading...</div>; <-- 로딩 중 일때는 로딩 DOM을 로드
 *   if (error) return <div>Error: {error.message}</div>; <-- 에러가 반환되었을때 에러 DOM을 로드
 *
 *   로딩도 , 에러도 아닐 경우
 *   return (
 *     <div>
 *       {posts.map(post => (
 *         <PostItem
 *           key={post.id}
 *           author={post.author.name}
 *           createdAt={post.createdAt}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */

interface TestParams {
    postCategoryNo?: number; // 게시글 카테고리NO
    orderType?: "R" | "P"; // 정렬구분(R: 최신순, P: 인기순)
    pageSize?: number; // 페이지 사이즈
    pageIndex?: number; // 페이지 인덱스(조회 1)
    groupId?: string;
}

export const useTestV1 = (params: TestParams = {}) => {

    //GET 메서드 : queryString 사용
    const queryParams = new URLSearchParams();
    if (params.groupId)
        queryParams.append('groupId', params.groupId.toString());
    const queryString = queryParams.toString();
    const url = `/menu/appMenuList${queryString ? `?${queryString}` : ""}`;

    return useGetQuery(['test'], url, {
        staleTime: 1000 * 60, // 1분
        cacheTime: 1000 * 60 * 5, // 5분
    });
};
export const useTestV2 = (params: TestParams = {}) => {
    return useGetQuery(
        ['test'],
        '/comCode/getComCodeList',
        params,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        });
};

export const useTestPost = () => {
    return usePostMutation<TestParams, APIResult>(
        "/comCode/getPostTest",
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    // 성공 시 처리
                    console.log("임시저장 성공:", data.message);
                } else {
                    // 실패 시 처리
                    console.error("임시저장 실패:", data.message);
                }
            },
            onError: (error) => {
                console.error("임시저장 에러:", error);
            },
        }
    );
};

export const useTestPostList = () => {
    return usePostMutation<TestParams, APIResult>(
        "/comCode/getPostListTest",
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    // 성공 시 처리
                    console.log("임시저장 성공:", data.message);
                } else {
                    // 실패 시 처리
                    console.error("임시저장 실패:", data.message);
                }
            },
            onError: (error) => {
                console.error("임시저장 에러:", error);
            },
        }
    );
};