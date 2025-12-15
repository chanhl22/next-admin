import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostContentsCommentPublicYnRequest {
    postNo?: number;
    commentNo?: number;
    adminPublicYn?: string;
}

export const useModPostContentsCommentPublicYn = () => {
    return usePostMutation<PostContentsCommentPublicYnRequest, APIResult>(
        "/community/modPostContentsCommentPublicYn",
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

