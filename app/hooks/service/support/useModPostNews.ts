import {apiClient, usePostMutation} from "@/app/api/utility/api";
import {APIResult} from "@/app/api/utility/apiResult";


interface PostNewsRequest {
    newsNo?: number;
    thumbFileNo?: number;
    title?: string;
    viewCnt?: number;
    langType?: string;
    adminDatetime?: string;
    adminNo?: number;
    adminName?: string;
    contentText?: string;
    contentHtml?: string;
    searchType?: string;
    searchText?: string;
    thumbFile?: File;
}

export const useModPostNews = () => {
    const reqUrl = '/support/modPostNews';
    return usePostMutation<PostNewsRequest, APIResult>(
        "",
        {
            mutationFn: async (postNewsRequest: PostNewsRequest) => {
                const formData = new FormData();
                Object.entries(postNewsRequest).forEach(([key, value]) => {
                    if (value !== null) {
                        formData.append(key, value);
                    }
                });

                const response = await apiClient.post(reqUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                return response.data;
            },
            onSuccess: (data) => {
                if (data.code === 0) {
                    console.log("저장 성공:", data.message);
                } else {
                    console.error("저장 실패:", data.message);
                }
            },
            onError: (error) => {
                console.error("등록 에러:", error);
            },
        }
    );
};
