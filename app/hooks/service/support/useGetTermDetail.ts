import { useGetQuery } from "@/app/api/utility/api";

interface PostTermDetailRequest {
    termNo?: number;
}

export const useGetTermDetail = (param: PostTermDetailRequest = {}) => {
    return useGetQuery(
        ['getTermDetail', param],
        '/support/getTermDetail',
        param,
        {
            enabled: !!param.termNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


