import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface UserInfo {
    userId?: string;
    userNo?: number;
    nickname?: string;
}

interface PostMessageSendRequest {
    sendType?: string;
    sendTargetType?: string;
    messageTitle?: string;
    messageContent?: string;
    reserveYn?: string;
    reserveDatetime?: string | null;
    targetUserList?: UserInfo[];
    userGradeList?: UserInfo[];
    tendencyUserList?: UserInfo[];
}

export const useInsPostMessageSend = () => {
    return usePostMutation<PostMessageSendRequest, APIResult>(
        "/user/insPostMessageSend",
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    console.log("저장 성공:", data.message);
                } else {
                    console.error("저장 실패:", data.message);
                }
            },
            onError: (error) => {
                console.error("등록 에러:", error);
            },
        }
    );
};
