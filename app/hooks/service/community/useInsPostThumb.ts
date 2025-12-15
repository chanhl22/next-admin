import {apiClient, usePostMutation} from "@/app/api/utility/api";
import {APIResult} from "@/app/api/utility/apiResult";


interface PostThumbRequest {
    postCategoryNo?: number;
    thumbName?: string;
    thumbFile?: File;
}

export const useInsPostThumb = () => {
    const reqUrl = '/community/insPostThumb';
    return usePostMutation<PostThumbRequest, APIResult>(
        "",
        {
            mutationFn: async (postThumbRequest: PostThumbRequest) => {
                const formData = new FormData();
                Object.entries(postThumbRequest).forEach(([key, value]) => {
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
