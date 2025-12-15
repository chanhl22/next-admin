import { useGetQuery } from "@/app/api/utility/api";

interface PostFaqMainQuestionRequest {
    mainQuestionCheck?: string;
}

export const useGetMainQuestionCheck = (param: PostFaqMainQuestionRequest = {}) => {
    return useGetQuery(
        ['etMainQuestionCheck', param],
        '/support/getMainQuestionCheck',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
