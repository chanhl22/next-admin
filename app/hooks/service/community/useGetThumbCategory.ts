import { useGetQuery } from "@/app/api/utility/api";

interface postThumbCategoryRequest {
    cMainNo?: number;
    cMainName?: string;
    cSubNo?: number;
    cSubName?: string;
    orderNo?: number;
}

export const useGetThumbCategory = (param: postThumbCategoryRequest = {}) => {
    return useGetQuery(
        ['useGetThumbCategory', param],
        '/community/getThumbCategoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

