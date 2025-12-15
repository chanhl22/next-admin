import {apiClient, usePostMutation} from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostInsCsRequest {
    inquiryNo?: number;
    csNo?: number;
    contentText?: string;
    csrContentText?: string;
    csrContentHtml?: string;
    inqRank?: number;
    resFile?: File[];
}

export const useInsPostCsEdit = () => {
    const reqUrl = '/support/insCsEdit';
    return usePostMutation<PostInsCsRequest, APIResult>(
        "",
        {
            mutationFn: async (postInsCsRequest: PostInsCsRequest) => {
                const formData = new FormData();

                // resFile 제외한 다른 필드들을 FormData에 추가
                Object.entries(postInsCsRequest).forEach(([key, value]) => {
                    if (key !== 'resFile' && value !== null) {
                        formData.append(key, value);
                    }
                });

                // resFile이 있는 경우 각 파일을 개별적으로 추가
                if (postInsCsRequest.resFile && postInsCsRequest.resFile.length > 0) {
                    postInsCsRequest.resFile.forEach((file, index) => {
                        formData.append('resFile', file);
                    });
                }

                const response = await apiClient.post(reqUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                return response.data;
            },
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


