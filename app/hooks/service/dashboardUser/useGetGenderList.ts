import { useGetQuery } from '@/app/api/utility/api';

interface UserDashboardRequest {
    periodType?: string;
    menuType?: string;
    appType?: string;
    startDate?: string;
    endDate?: string;
    dataId?: string;
}

export const useGetGenderList = (param: UserDashboardRequest = {}) => {
    return useGetQuery(
        ['getGenderList', param],
        '/userDashboard/getGenderList',
        param,
        {
            staleTime: 1000 * 60,       // 1분
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

