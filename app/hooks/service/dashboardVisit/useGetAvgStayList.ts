import { useGetQuery } from '@/app/api/utility/api';

interface VisitDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetAvgStayList = (param: VisitDashboardRequest = {}) => {
    return useGetQuery(
        ['getAvgStayList', param],
        '/visitDashboard/getAvgStayList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

