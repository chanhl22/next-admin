import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveyExtraQuestionListRequest {
    extraNo?: number;
    searchMainCategoryNo?: string;
    searchSubCategoryNo?: number;
    searchType?: string;
    searchValue?: string;
}

export const useGetSurveyExtraQuestionList  = (param: PostSurveyExtraQuestionListRequest = {}) => {
    return useGetQuery(
        ['getSurveyExtraQuestionList', param],
        '/service/getSurveyExtraQuestionList',
        param,
        {
            enabled: !!param.extraNo,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
