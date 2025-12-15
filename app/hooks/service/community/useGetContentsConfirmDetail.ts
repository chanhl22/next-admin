import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsConfirmDetailRequest {
    reportNo?: number;
}

export const useGetContentsConfirmDetail = (param: PostContentsConfirmDetailRequest = {}) => {
    return useGetQuery(
        ['getContentsConfirmDetail', param],
        '/community/getContentsConfirmDetail',
        param,
        {
            enabled: !!param.reportNo,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
