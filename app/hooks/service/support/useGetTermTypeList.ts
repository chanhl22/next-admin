import { useGetQuery } from "@/app/api/utility/api";

interface PostTermTypeListRequest {
    termType?: string;
    pageSize?: number;
    pageIndex?: number;
}

export const useGetTermTypeList = (param: PostTermTypeListRequest = {}) => {
    return useGetQuery(
        ['getTermTypeList', param],
        '/support/getTermTypeList',
        param,
        {
            enabled: !!param.termType,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
