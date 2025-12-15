import { usePostMutation } from "@/app/api/utility/api";
import { APIResult } from "@/app/api/utility/apiResult";

interface UserDomainRequest {
    domainNo?: Number;
    domain?:string;
    regDate?:string;
    expDate?:string;
    agencyName?:string;
    useYn?:string;
}


export const useDelPostUserDomain = () => {
    return usePostMutation<UserDomainRequest, APIResult>(
        "/userDomain/delUserDomain",
        {
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

