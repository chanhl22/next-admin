import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsReportRequest {
    postNo?: number;
}

export const useGetContentsDetail = (param: PostContentsReportRequest = {}) => {
    return useGetQuery(
        ['getContentsDetail', param],
        '/community/getContentsDetail',
        param,
        {
            enabled: !!param.postNo,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
