import { useGetQuery } from '@/app/api/utility/api';

interface UserDomainRequest {
    domainNo?: string;
}

export const useGetUserDomainList = (param: UserDomainRequest = {}) => {
    return useGetQuery(
        ['getUserDomainList', param],
        '/userDomain/getUserDomainList',
        param,
        {
            staleTime: 0,               // fresh 관리X
            cacheTime: 1000 * 60 * 5,   // 5분
        }
    );
};

