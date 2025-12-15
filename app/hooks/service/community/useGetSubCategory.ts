import { useGetQuery } from "@/app/api/utility/api";

interface postSubCategoryRequest {
    cMainNo?: number;
    cSubNo?: number;
    cSubName?: string;
    orderNo?: number;
}

export const useGetSubCategory = (param: postSubCategoryRequest = {}) => {
    return useGetQuery(
        ['useGetSubCategory', param],
        '/community/getSubCategory',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

