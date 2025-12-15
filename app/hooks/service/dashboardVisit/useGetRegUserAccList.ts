import { useGetQuery } from '@/app/api/utility/api';

interface VisitDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetRegUserAccList = (param: VisitDashboardRequest = {}) => {
    return useGetQuery(
        ['getRegUserAccList', param],
        '/visitDashboard/getRegUserAccList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

