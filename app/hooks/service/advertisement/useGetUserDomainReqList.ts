import { useGetQuery } from '@/app/api/utility/api';

interface UserDomainReqRequest {
    reqStateType?: string;
    userNickname?: string;
    adminNickname?: string;
}

export const useGetUserDomainReqList = (param: UserDomainReqRequest = {}) => {
    return useGetQuery(
        ['getUserDomainReqList', param],
        '/userDomain/getUserDomainReqList',
        param,
        {
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
            enabled: false,
        }
    );
};

