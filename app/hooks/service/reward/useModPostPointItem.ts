import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostPointItemRequest {
    pointItemNo?: number;
    useYn?: string;
    usePoint?: string;
    dscntStartDatetime?: string;
    dscntEndDatetime?: string;
    unlmtDscntYn?: string;
    pointItemCtgNoSub?: string;
    pointItemName?: string;
    guideDesc?: string;
    storeDesc?: string;
}

export const useModPostPointItem = () => {
    return usePostMutation<PostPointItemRequest, APIResult>(
        "/reward/modPostPointItem",
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



