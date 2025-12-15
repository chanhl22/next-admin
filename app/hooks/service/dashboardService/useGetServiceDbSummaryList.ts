import { useGetQuery } from '@/app/api/utility/api';

export const useGetServiceDbSummaryList = (param: any = {}) => {
    return useGetQuery(
        ['getServiceDbSummaryList', param],
        '/serviceDashboard/getServiceDbSummaryList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

