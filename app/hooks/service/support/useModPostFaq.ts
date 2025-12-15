import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface tagList {
    tagName: string;
    tagNo: number;
}

interface PostModFaqRequest {
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

export const useModPostFaq = () => {
    return usePostMutation<PostModFaqRequest, APIResult>(
        "/support/modFaqEdit",
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    console.log("저장 성공:", data.message);
                } else {
                    console.error("저장 실패:", data.message);
                }
            }
        }
    );
};


