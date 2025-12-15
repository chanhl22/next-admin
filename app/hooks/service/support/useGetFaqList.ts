import { useGetQuery } from "@/app/api/utility/api";

interface PostFaqListRequest {
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
    createAdminNo?: string;
    adminName?: string;
    createDatetime?: string;
    viewCnt?: string;
    searchType?: string;
    searchKeyword?: string;
    categoryType01?: string;
    categoryType02?: string;
    categoryType03?: string;
    newEdit?:string;
}

export const useGetFaqList = (param: PostFaqListRequest = {}) => {
    return useGetQuery(
        ['etFaqList', param],
        '/support/getFaqList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
