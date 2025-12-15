import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsSubCategoryListRequest {
    pPostCategoryNo?: number;
    tabSearch?: string;
}

export const useGetContentsSubCategoryList = (param: PostContentsSubCategoryListRequest = {}) => {
    return useGetQuery(
        ['getContentsSubCategoryList', param],
        '/community/getContentsSubCategoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
