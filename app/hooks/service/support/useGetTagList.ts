import { useGetQuery } from "@/app/api/utility/api";

interface PostTagListRequest {
    faqNo?: number;
    tagName?: string;
}

export const useGetTagList = (param: PostTagListRequest = {}) => {
    return useGetQuery(
        ['etFaqList', param],
        '/support/getTagList',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
