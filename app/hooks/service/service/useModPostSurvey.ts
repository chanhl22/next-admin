import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface PostSurveyItem {
    itemNo?: number;
    itemVer: number;
    langType: string;
    name: string;
    score: number;
    selectMessage: string;
}

interface PostSurveyQuestion {
    questionNo?: number;
    questionVer: number;
    title: string;
    sourceName?: string;
    items: PostSurveyItem[];
}

interface PostSurveyPayload {
    questionList: PostSurveyQuestion[];
}

export const useModPostSurvey = () => {
    return usePostMutation<PostSurveyPayload, APIResult>(
        "/service/modPostSurvey",
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
