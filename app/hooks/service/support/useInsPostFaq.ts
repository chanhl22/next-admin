import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface tagList {
    tagNo?: number;
    tagName?: string;
}

interface PostInsFaqRequest {
    faqNo?: number;
    categoryType: string;
    langType?: string;
    content?: string;
    mainQuestionYn?: string;
    questionTitle?: string;
    answerText?: string;
    answerHtml?: string;
    tagList?: tagList[];
}

export const useInsPostFaq = () => {
    return usePostMutation<PostInsFaqRequest, APIResult>(
        "/support/insFaqEdit",
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


