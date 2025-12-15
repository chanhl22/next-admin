import { useGetQuery } from "@/app/api/utility/api";

interface PostEventStatusInfoRequest {

}

export const useGetEventStatusInfo = (param: PostEventStatusInfoRequest = {}) => {
    return useGetQuery(
        ['getEventStatusInfo', param],
        '/reward/getEventStatusInfo',
        param,
        {
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};
