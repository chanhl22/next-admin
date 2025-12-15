import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostBrandExcelUploadRequest {
    depth1?: string
    depth2?: string
    depth3?: string
    menuNo?: number
    url?: string
    searchYn?: string
    metaTitle?: string
    metaDesc?: string
    metaKeyword?: string
    h1Tag?: string
    h2Tag?: string
}

export const useModPostBrandExcelUpload = () => {
    return usePostMutation<PostBrandExcelUploadRequest, APIResult>(
        "/service/modBrandMenuExcelUpload",
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


