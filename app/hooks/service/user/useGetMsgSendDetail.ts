import { useGetQuery } from "@/app/api/utility/api";

interface PostMsgSendDetailRequest {
    sendGrpNo?: number;
}

export const useGetMsgSendDetail = (param: PostMsgSendDetailRequest = {}) => {
    return useGetQuery(
        ['getMsgSendDetail', param],
        '/user/getMsgSendDetail',
        param,
        {
            enabled: !!param.sendGrpNo,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};