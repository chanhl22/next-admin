import { useGetQuery } from "@/app/api/utility/api";

interface PostPointStatusInfoRequest {

}

export const useGetPointStatusInfo = (param: PostPointStatusInfoRequest = {}) => {
    return useGetQuery(
        ['getPointStatusInfo', param],
        '/reward/getPointStatusInfo',
        param,
        {
            staleTime: 1000 * 60,    // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};


