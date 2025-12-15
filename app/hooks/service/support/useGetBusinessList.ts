import { useGetQuery } from "@/app/api/utility/api";


interface PostBusinessListRequest {
    businessNo?: number;
    businessType?: string;
    businessTypeName?: string;
    datetime?: string;
    writerName?: string;
    writerEmail?: string;
    content?: string;
    searchType?: string;
    searchText?: string;
}

export const useGetBusinessList = (param: PostBusinessListRequest = {}) => {
    return useGetQuery(
        ['etBusinessList', param],
        '/support/getBusinessList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
