import { useGetQuery } from "@/app/api/utility/api";

interface PostFaqDetailRequest {
    faqNo?: string;
    categoryType?: string;
    mainQuestionYn?: string;
    questionTitle?: string;
    answerText?: string;
    answerHtml?: string;
    tagName?: string;
    tagAll?: string;
    tagNo?: string;
    langType?: string;
}

export const useGetFaqDetail = (param: PostFaqDetailRequest = {}) => {
    return useGetQuery(
        ['etFaqList', param],
        '/support/getFaqDetail',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
