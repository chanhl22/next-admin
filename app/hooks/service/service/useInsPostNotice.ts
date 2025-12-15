import {apiClient, usePostMutation} from "@/app/api/utility/api";
import {APIResult} from "@/app/api/utility/apiResult";

interface PostNoticeRequest {
    noticeNo?: number;
    noticeFileNo?: number;
    title?: string;
    contentText?: string;
    contentHtml?: string;
    viewCnt?: number;
    langType?: string;
    importantYn?: string;
    pushYn?: string;
    adminDatetime?: string;
    adminNo?: number;
    adminName?: string;
    koTitle?: string;
    enTitle?: string;
    koContent?: string;
    enContent?: string;
    noticeFile?: File[];
}

export const useInsPostNotice = () => {
    const reqUrl = '/service/insPostNotice';
    return usePostMutation<PostNoticeRequest, APIResult>(
        "",
        {
            mutationFn: async (postNoticeRequest: PostNoticeRequest) => {
                const formData = new FormData();
                
                // noticeFile을 제외한 다른 필드들을 FormData에 추가
                Object.entries(postNoticeRequest).forEach(([key, value]) => {
                    if (key !== 'noticeFile' && value !== null) {
                        formData.append(key, value);
                    }
                });

                // noticeFile이 있는 경우 각 파일을 개별적으로 추가
                if (postNoticeRequest.noticeFile && postNoticeRequest.noticeFile.length > 0) {
                    postNoticeRequest.noticeFile.forEach((file, index) => {
                        formData.append('noticeFile', file);
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
