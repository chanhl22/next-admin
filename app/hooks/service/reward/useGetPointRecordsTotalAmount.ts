import { useGetQuery } from "@/app/api/utility/api";

interface PostPointRecordsTotalAmountRequest {
    searchStartDt?: string;
    searchEndDt?: string;
}

export const useGetPointRecordsTotalAmount = (param: PostPointRecordsTotalAmountRequest = {}) => {
    return useGetQuery(
        ['getPointRecordsTotalAmount', param],
        '/reward/getPointRecordsTotalAmount',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


