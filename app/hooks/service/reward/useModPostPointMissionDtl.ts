import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface MissionItem {
    pointMissionNo: number;
    amount: number;
    limitType: string;
    limitCnt: number | null;
    limitDay: number | null;
}

export interface PostPointMissionDtlRequest {
    pointMissionDate: string;
    missions: MissionItem[];
}

export const useModPostPointMissionDtl = () => {
    return usePostMutation<PostPointMissionDtlRequest, APIResult>(
        "/reward/modPostPointMissionDtl",
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
