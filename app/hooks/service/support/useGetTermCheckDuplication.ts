import { useGetQuery } from "@/app/api/utility/api";

interface PostTermCheckDuplicationRequest {
    termType?: string;
}

export const useGetTermCheckDuplication = (param: PostTermCheckDuplicationRequest = {}) => {
    return useGetQuery(
        ['getTermCheckDuplication', param],
        '/support/getTermCheckDuplication',
        param,
        {
            enabled: !!param.termType,
            staleTime: 1000 * 60, // 1분
            cacheTime: 1000 * 60 * 5, // 5분
        }
    );
};