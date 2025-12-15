import { useGetQuery } from '@/app/api/utility/api';

interface ComCodeListRequest {
    groupId: string;
    langType?: string;
}

export const useGetComCodeListMulti = (param: ComCodeListRequest) => {
    return useGetQuery(
        ['getComCodeListMulti', param],
        '/comCode/getComCodeListMulti',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};

