import { useGetQuery } from "@/app/api/utility/api";

interface postThumbListRequest {
    thumbNo?: number;
    postCategoryNo?: number;
    thumbFileNo?: number;
    thumbName?: string;
    contentHtml?: string;
    thumbFileSize?: string;
    thumbFileFullPath?: string;
    uploadDate?: string;
    thumbExtension?: string;
    searchKeyword?: string;
    searchType?: string;
    thumbDepth1?: string;
    thumbDepth2?: string;
    tabMainCategory?: number;
    tabSubCategory?: number;
}

export const useGetThumbList = (param: postThumbListRequest = {}) => {
    return useGetQuery(
        ['useGetThumbList', param],
        '/community/getThumbList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

