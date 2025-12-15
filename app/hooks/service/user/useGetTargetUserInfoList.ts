import { useGetQuery } from "@/app/api/utility/api";

interface PostTargetUserInfoListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchKeyword?: string;
}

export const useGetTargetUserInfoList = (param: PostTargetUserInfoListRequest = {}) => {
    return useGetQuery(
        ['getTargetUserInfoList', param],
        '/user/getTargetUserInfoList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};