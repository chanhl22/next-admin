import { useGetQuery } from '@/app/api/utility/api';

interface ServiceDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetEditorAccList = (param: ServiceDashboardRequest = {}) => {
    return useGetQuery(
        ['getEditorAccList', param],
        '/serviceDashboard/getEditorAccList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

