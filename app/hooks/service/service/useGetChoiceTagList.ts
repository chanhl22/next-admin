import { useGetQuery } from "@/app/api/utility/api";

interface PostChoiceTagListRequest {
    tagName?: string;
}

export const useGetChoiceTagList  = (param: PostChoiceTagListRequest = {}) => {
    return useGetQuery(
        ['getChoiceTagList', param],
        '/service/getChoiceTagList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
