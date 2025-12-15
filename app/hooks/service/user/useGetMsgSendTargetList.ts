import { useGetQuery } from "@/app/api/utility/api";

interface PostMsgSendTargetListRequest {
    pageSize?: number;
    pageIndex?: number;
    sendGrpNo?: number;
    searchType?: string;
    searchValue?: string;
}

export const useGetMsgSendTargetList = (param: PostMsgSendTargetListRequest = {}) => {
    return useGetQuery(
        ['getMsgSendTargetList', param],
        '/user/getMsgSendTargetList',
        param,
        {
            enabled: !!param.sendGrpNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};