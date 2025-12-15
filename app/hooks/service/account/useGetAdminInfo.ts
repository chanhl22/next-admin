import { useGetQuery } from '@/app/api/utility/api';

interface AdminInfoRequest {
    adminNo?: number;
    email?: string;
    authGroupNo?: number;
    name?:string;
    nickName?:string;
    srchType?:string;
}

export const useGetAdminInfo = (param: AdminInfoRequest = {}) => {
    return useGetQuery(
        ['getAdminInfo', param],
        '/account/getAdminInfoList',
        param,
        {
            // staleTime: 1000 * 60,    // 1분
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: !!param.adminNo,   // 필수값
        }
    );
};

