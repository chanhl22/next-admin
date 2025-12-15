import { useGetQuery } from "@/app/api/utility/api";

interface postAppNoticeListRequest {
    noticeNo?: number;
    langType?: string;
    importantYn?: string;
    contentText?: string;
    contentHtml?: string;
    adminDateTime?: string;
    adminName?: string;
    adminView?: string;
    searchType?: string;
    searchText?: string;

}

export const useGetAppNoticeList = (param: postAppNoticeListRequest = {}) => {
    return useGetQuery(
        ['useGetAppNoticeList', param],
        '/service/getAppNoticeList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

