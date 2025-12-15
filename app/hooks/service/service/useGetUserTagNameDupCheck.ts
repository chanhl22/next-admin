import { useGetQuery } from "@/app/api/utility/api";

interface PostUserTagNameDupCheckRequest {
    tagName?: string;
}

export const useGetUserTagNameDupCheck  = (param: PostUserTagNameDupCheckRequest = {}) => {
    return useGetQuery(
        ['getUserTagNameDupCheck', param],
        '/service/getUserTagNameDupCheck',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
