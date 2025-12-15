import { useGetQuery } from "@/app/api/utility/api";

interface postAppNoticeDetailRequest {
    noticeNo?: number;
    langType?: string;
}

export const useGetAppNoticeDetail = (param: postAppNoticeDetailRequest = {}) => {
    return useGetQuery(
        ['useGetAppNoticeDetail', param],
        '/service/getAppNoticeDetail',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

