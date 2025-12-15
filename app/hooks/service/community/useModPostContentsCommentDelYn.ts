import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostContentsCommentDelYnRequest {
    commentNo?: number;
}

export const useModPostContentsCommentDelYn = () => {
    return usePostMutation<PostContentsCommentDelYnRequest, APIResult>(
        "/community/modPostContentsCommentDelYn",
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

