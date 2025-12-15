import { useGetQuery } from '@/app/api/utility/api';

export const useGetVisitDbSummaryList = (param: any = {}) => {
    return useGetQuery(
        ['getVisitDbSummaryList', param],
        '/visitDashboard/getVisitDbSummaryList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

