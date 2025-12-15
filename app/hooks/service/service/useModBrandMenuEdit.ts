import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface MenuEditParam {
    menuNo: number;
    metaTitle: string;
    metaDesc: string;
    metaKeyword: string;
    h1Tag: string;
    h2Tag: string;
}


export const useModBrandMenuEdit = () => {
    return usePostMutation<MenuEditParam, APIResult>(
        "/service/modBrandMenuEdit",
        {
            onSuccess: (data) => {
                if (data.code === 0) {
                    console.log("저장 성공:", data.message);
                } else {
                    console.error("저장 실패:", data.message);
                }
            },
            onError: (error) => {
                console.error("저장 에러:", error);
            },
        }
    );
};

