import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface EventContent {
    langType: string;
    title: string;
    bannerImgData: string;      // 배너 이미지 데이터(base64)
    contentText: string;
}

interface EventFile {
    langType: string;
    fileData: string;
    fileName: string;
}

interface EventTag {
    tagNo: number;
}

interface SubEventTag {
    tagNo: number;
}

interface PostEventRequest {
    participantType : string;
    linkUrl?: string;
    startDate?: string;
    endDate?: string;
    contents: EventContent[];
    fileList?: EventFile[];
    tagList?: EventTag[];
    subTagList?: SubEventTag[];
}

export const useInsPostEvent = () => {
    return usePostMutation<FormData, APIResult>(
        "/reward/insPostEvent",
        {
            headers: { 'Content-Type': 'multipart/form-data' },
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



