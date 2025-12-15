import { useGetQuery } from "@/app/api/utility/api";

interface PostCategoryListRequest {
    pPostCategoryNo?: number;
    postCategoryNo?: number;
    postCategoryName?: string;
}

export const useGetCategoryList = (param: PostCategoryListRequest = {}) => {
    return useGetQuery(
        ['etCategoryList', param],
        '/community/getCategoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
