import { useGetQuery } from "@/app/api/utility/api";

interface PostPointRecordsListRequest {
    pageSize?: number;
    pageIndex?: number;
    sortField?: string;
    sortOrder?: number;
    searchStartDt?: string;
    searchEndDt?: string;
    searchPointType?: string;
    searchType?: string;
    searchValue?: string;
}

export const useGetPointRecordsList = (param: PostPointRecordsListRequest = {}) => {
    return useGetQuery(
        ['getPointRecordsList', param],
        '/reward/getPointRecordsList',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


