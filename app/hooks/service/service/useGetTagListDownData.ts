import { useGetQuery } from "@/app/api/utility/api";

interface PostTagExcelDownloadRequest {
    rowNum?: number;
    tagName?: string;
    publishCnt?: string;
    cleansingYn?: string;
    tagDate?: string;
    serviceType?: string;
}

export const useGetTagListDownData  = (param: PostTagExcelDownloadRequest = {}) => {
    return useGetQuery(
        ['getTagListDownData', param],
        '/service/getTagListDownData',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
