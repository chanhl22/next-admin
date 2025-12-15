import { useGetQuery } from '@/app/api/utility/api';

interface MenuDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetMenuVisitCntMonthList = (param: MenuDashboardRequest = {}) => {
    return useGetQuery(
        ['getMenuVisitCntMonthList', param],
        '/menuDashboard/getMenuVisitCntMonthList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

