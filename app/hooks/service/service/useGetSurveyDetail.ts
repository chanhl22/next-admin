import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveyDetailRequest {
    questionNo?: number;
    questionVer?: number;
}

export const useGetSurveyDetail = (param: PostSurveyDetailRequest = {}) => {
    return useGetQuery(
        ['getSurveyDetail', param],
        '/service/getSurveyDetail',
        param,
        {
            enabled: !!param?.questionNo && !!param?.questionVer,
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


``