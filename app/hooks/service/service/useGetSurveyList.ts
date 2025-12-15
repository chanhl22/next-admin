import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveyListRequest {
    searchLangType?: string;
    searchMainCategoryNo?: string;
    searchSubCategoryNo?: number;
    pageSize?: number;
    pageIndex?: number;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetSurveyList  = (param: PostSurveyListRequest = {}) => {
    return useGetQuery(
        ['getSurveyList', param],
        '/service/getSurveyList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
