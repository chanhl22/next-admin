import { useGetQuery } from '@/app/api/utility/api';

interface InvLpUserPreInfoDto {
    startDate?: string;
    endDate?: string;
    mapId?: string;
    name?: string;
    mapNickname?: string;
    phone?: string;
    birth?: string;
    gender?: string;
}
export const useGetUserInfoIntrList = (param: InvLpUserPreInfoDto = {}) => {
    return useGetQuery(
        ['getUserInfoIntrList', param],
        '/invLp/getUserInfoIntrList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            // cacheTime: 1000 * 60 * 5,   // 5분
            staleTime: 0, // fresh 관리X
            cacheTime: 0,
        }
    );
};

