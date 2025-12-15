import { useGetQuery } from '@/app/api/utility/api';

interface UserDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetAgeBandList = (param: UserDashboardRequest = {}) => {
    return useGetQuery(
        ['getAgeBandList', param],
        '/userDashboard/getAgeBandList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

