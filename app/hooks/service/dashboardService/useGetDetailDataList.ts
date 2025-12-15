import { useGetQuery } from '@/app/api/utility/api';

interface ServiceDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetDetailDataList = (param: ServiceDashboardRequest = {}) => {
    return useGetQuery(
        ['getDetailDataList', param],
        '/serviceDashboard/getDetailDataList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

