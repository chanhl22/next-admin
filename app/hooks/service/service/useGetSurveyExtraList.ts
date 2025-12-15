import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveyExtraListRequest {
    searchMainCategoryNo?: string;
    searchSubCategoryNo?: number;
    pageSize?: number;
    pageIndex?: number;
    searchType?: string;
    searchValue?: string;
    sortField?: string;
    sortOrder?: number;
}

export const useGetSurveyExtraList  = (param: PostSurveyExtraListRequest = {}) => {
    return useGetQuery(
        ['getSurveyExtraList', param],
        '/service/getSurveyExtraList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
