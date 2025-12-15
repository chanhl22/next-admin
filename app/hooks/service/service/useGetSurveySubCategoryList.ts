import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveySubCategoryListRequest {
    mainCategoryCode?: string;
}

export const useGetSurveySubCategoryList = (param: PostSurveySubCategoryListRequest = {}) => {
    return useGetQuery(
        ['getSurveySubCategoryList', param],
        '/service/getSurveySubCategoryList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
