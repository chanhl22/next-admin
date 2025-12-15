import { useGetQuery } from '@/app/api/utility/api';

interface AdminAuthGrpRequest {
    authGroupNo?: number;
    name?:string;
    orderNo?: number;
    useYn?: string;
}

export const useGetAdminAuthGroupList = (param: AdminAuthGrpRequest = {}) => {
    return useGetQuery(
        ['getAdminAuthGroupList', param],
        '/account/getAdminAuthGroupList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

