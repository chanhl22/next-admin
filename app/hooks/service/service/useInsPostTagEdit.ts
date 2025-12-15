import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostTagEditRequest {
    tagName?: string
    tagNo?: number
    crudType?: string
    checkTagNo?: number
}

export const useInsPostTagEdit = () => {
    return usePostMutation<PostTagEditRequest, APIResult>(
        "/service/insPostTagEdit",
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


