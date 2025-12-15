import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveyQuestionTitleDuplicationRequest {
    langType?: string;
    categoryNo?: number;
    title?: string;
}

export const useGetSurveyQuestionTitleDuplication = (param: PostSurveyQuestionTitleDuplicationRequest = {}) => {
    return useGetQuery(
        ['getSurveyQuestionTitleDuplication', param],
        '/service/getSurveyQuestionTitleDuplication',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};