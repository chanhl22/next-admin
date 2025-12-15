import { useGetQuery } from "@/app/api/utility/api";

interface PostContentsReportDetailRequest {
    reportDetailNo?: number;
}

export const useGetContentsReportDetail = (param: PostContentsReportDetailRequest = {}) => {
    return useGetQuery(
        ['getContentsReportDetail', param],
        '/community/getContentsReportDetail',
        param,
        {
            enabled: !!param.reportDetailNo,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
