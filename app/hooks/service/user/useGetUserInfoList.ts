import { useGetQuery } from "@/app/api/utility/api";

interface PostUserInfoListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchUserGrade?: string;
    searchTendencyNo?: number;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetUserInfoList = (param: PostUserInfoListRequest = {}) => {
    return useGetQuery(
        ['getUserInfoList', param],
        '/user/getUserInfoList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
