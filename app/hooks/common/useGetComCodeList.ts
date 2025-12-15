import { useGetQuery } from '@/app/api/utility/api';

interface postComCodeListRequest {
    groupId?: string;
    langType?: string;
}

export const useGetComCodeList = (param: postComCodeListRequest = {}) => {
    return useGetQuery(
        ['getComCodeList', param],
        '/comCode/getComCodeList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

