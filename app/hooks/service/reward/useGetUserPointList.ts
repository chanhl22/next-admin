import { useGetQuery } from "@/app/api/utility/api";

interface PostUserPointListRequest {
    pageSize?: number;
    pageIndex?: number;
    sortField?: string;
    sortOrder?: number;
}

export const useGetUserPointList = (param: PostUserPointListRequest = {}) => {
    return useGetQuery(
        ['getUserPointList', param],
        '/reward/getUserPointList',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


