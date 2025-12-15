import {usePostMutation} from '@/app/api/utility/api';
import { APIResult } from '@/app/api/utility/apiResult';

export const useGetLogout = () => {
    return usePostMutation<any, APIResult>(
        '/auth/logout',
        {
            onSuccess: (data) => {
                console.log(data);
                if (data && data.code === 0) {
                } else {
                }
            },
            onError: (error) => {
            },
        }
    );
};

