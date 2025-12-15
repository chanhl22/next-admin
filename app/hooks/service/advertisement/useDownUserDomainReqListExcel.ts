import { usePostMutation } from "@/app/api/utility/api";

interface UserDomainReqListExcelRequest {
    reqStateType?: string;
    userNickname?: string;
    adminNickname?: string;
    /*maskingOption?: string;*/
    adminPassword?: string;
    excelPassword?: string;
    downloadReason?: string;
}

export const useDownUserDomainReqListExcel = () => {
    return usePostMutation<UserDomainReqListExcelRequest, Blob>(
        '/userDomain/downUserDomainReqListExcel',
        {
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            responseType: 'blob',
            onSuccess: (data) => {
                console.log('엑셀성공:', data);
            },
            onError: (error) => {
                // console.error('저장 에러:', error);
            },
        }
    );
};
