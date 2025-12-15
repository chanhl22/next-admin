import { useGetQuery } from "@/app/api/utility/api";

interface PostMsgSendListRequest {
    pageSize?: number;
    pageIndex?: number;
    searchSystemPushYn?: string;
    searchSendResult?: string;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetMsgSendList = (param: PostMsgSendListRequest = {}) => {
    return useGetQuery(
        ['getMsgSendList', param],
        '/user/getMsgSendList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
