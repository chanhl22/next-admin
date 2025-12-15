import { useGetQuery } from "@/app/api/utility/api";

interface postMainCategoryRequest {
    cMainNo?: number;
    cMainName?: string;
    orderNo?: number;
}

export const useGetMainCategory = (param: postMainCategoryRequest = {}) => {
    return useGetQuery(
        ['useGetMainCategory', param],
        '/community/getMainCategory',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

