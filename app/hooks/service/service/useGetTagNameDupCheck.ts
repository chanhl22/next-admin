import { useGetQuery } from "@/app/api/utility/api";

interface PostTagNameDupCheckRequest {
    tagName?: string;
}

export const useGetTagNameDupCheck  = (param: PostTagNameDupCheckRequest = {}) => {
    return useGetQuery(
        ['getTagNameDupCheck', param],
        '/service/getTagNameDupCheck',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
