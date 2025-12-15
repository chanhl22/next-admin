import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsMainCategoryListRequest {
}

export const useGetContentsMainCategoryList = (param: PostContentsMainCategoryListRequest = {}) => {
    return useGetQuery(
        ['getContentsMainCategoryList', param],
        '/community/getContentsMainCategoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
