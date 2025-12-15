import { useGetQuery } from "@/app/api/utility/api";

interface postBrandMenuListRequest {
    menuNo?: string;
}

export const useGetBrandMenuList = (param: postBrandMenuListRequest = {}) => {
    return useGetQuery(
        ['useGetBrandMenuList', param],
        '/service/getBrandMenuList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

