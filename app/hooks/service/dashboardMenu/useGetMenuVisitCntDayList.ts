import { useGetQuery } from '@/app/api/utility/api';

interface MenuDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetMenuVisitCntDayList = (param: MenuDashboardRequest = {}) => {
    return useGetQuery(
        ['getMenuVisitCntDayList', param],
        '/menuDashboard/getMenuVisitCntDayList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

