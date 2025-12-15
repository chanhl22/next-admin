import { useGetQuery } from '@/app/api/utility/api';

interface VisitDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetUserCntTrendList = (param: VisitDashboardRequest = {}) => {
    return useGetQuery(
        ['getUserCntTrendList', param],
        '/visitDashboard/getUserCntTrendList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

