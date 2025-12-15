import { useGetQuery } from "@/app/api/utility/api";

interface PostSurveyExtraDetailRequest {
    extraNo?: number;
}

export const useGetSurveyExtraDetail  = (param: PostSurveyExtraDetailRequest = {}) => {
    return useGetQuery(
        ['getSurveyExtraDetail', param],
        '/service/getSurveyExtraDetail',
        param,
        {
            enabled: !!param.extraNo,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
