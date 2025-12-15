import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostPointMissionOrderRequest {
    pmCategoryNo: number;
    orderNo: number;
}

export const useModPostPointMissionOrder = () => {
    return usePostMutation<PostPointMissionOrderRequest[], APIResult>(
        "/reward/modPostPointMissionOrder",
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    console.log("저장 성공:", data.message);
                } else {
                    console.error("저장 실패:", data.message);
                }
            },
            onError: (error) => {
                console.error("저장 에러:", error);
            },
        }
    );
};
