import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostPointItemCpnCnclRequest {
    pointItemCpnNo?: number;
    issueCnclYn?: string;
    issueCnclYnReason?: string;
}

export const useModPostPointItemCpnCncl = () => {
    return usePostMutation<PostPointItemCpnCnclRequest, APIResult>(
        "/reward/modPostPointItemCpnCncl",
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



